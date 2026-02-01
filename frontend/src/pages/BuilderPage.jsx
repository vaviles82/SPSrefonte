import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import '@builder.io/widgets';

function BuilderPage() {
  const { path } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/builder-io/${path}`);

      console.log(response.data);
      setContent(response.data);
    };
    fetchContent();
  }, [path]);

  return (
    <div className="">
      {content && content.metaTitle && <Head title={content.metaTitle} />}
      {content && content.metaDescription && <meta name="description" content={content.metaDescription} />}
      {content && content.results && content.results.length > 0 && (
        <div className="">
          <BuilderComponent model="global" content={content.results[0]} />
        </div>
      )}
    </div>
  );
}

export default BuilderPage;
