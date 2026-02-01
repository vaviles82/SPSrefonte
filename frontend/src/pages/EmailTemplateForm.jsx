import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

const EmailTemplateForm = () => {
  const [formData, setFormData] = useState({
    content: "",
    templateId: "",
  });
  const [templates, setTemplates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleQuillChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/email-templates/create`, formData);
      setSubmitMessage("Le modèle d'email a été créé avec succès !");
      setFormData({
        content: "",
      });
      console.log(response);
    } catch (error) {
      setSubmitError("Une erreur est survenue lors de la création du modèle. Veuillez réessayer.");
      console.error("Erreur lors de la soumission du formulaire:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  async function listTemplates() {
    try {
      const response = await axios.get("http://localhost:5000/api/email/templates");

      console.log("response", response);
      setTemplates(response.data.templates);
      setFormData({
        templateId: response.data.templates[0].id,
      });


      return templates;
    } catch (error) {
      console.error("Erreur lors du chargement des templates :", error.response?.data || error.message);
      return [];
    }
  }

  const modules = {
    toolbar: [[{ header: [1, 2, 3, 4, 5, 6, false] }], ["bold", "italic", "underline", "strike"], [{ color: [] }, { background: [] }], [{ list: "ordered" }, { list: "bullet" }], [{ align: [] }], ["link", "image"], ["clean"]],
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  useEffect(() => {
    listTemplates();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Envoi d'un mail</h2>

      {submitMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{submitMessage}</div>}

      {submitError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{submitError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 font-medium">Contenu du mail</label>
          <div className="border border-gray-300 rounded">
            <ReactQuill theme="snow" value={formData.content} onChange={(content) => handleQuillChange("content", content)} modules={modules} placeholder="Contenu de l'en-tête du mail..." className="bg-white min-h-[200px]" />
          </div>
          <p className="mt-1 text-sm text-gray-500">Le contenu apparaîtra dans le corps du mail.</p>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 transition duration-200">
            {isSubmitting ? "Création en cours..." : "Créer le modèle"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailTemplateForm;
