import { Builder } from '@builder.io/react';
import ContactForm from './ContactForm';
import Article from './Article';
import Navbar from './NavBar';
import Footer from './Footer';

Builder.registerComponent(Article, {
  name: 'Article',
  inputs: [
    {
      name: 'imageUrl',
      type: 'string',
      defaultValue: 'https://via.placeholder.com/150',
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Titre de l’article',
    },
    {
      name: 'description',
      type: 'text',
      defaultValue: 'Description de l’article',
    },
  ],
});

Builder.registerComponent(Navbar, {
  name: 'Navbar',
  inputs: [],
});

Builder.registerComponent(Footer, {
  name: 'Footer',
  inputs: [],
});

Builder.registerComponent(ContactForm, {
  name: 'ContactForm',
  inputs: [
    { name: 'nom', type: 'text', defaultValue: 'Nom' },
    { name: 'prenom', type: 'text', defaultValue: 'Prénom' },
    { name: 'email', type: 'email', defaultValue: 'Email' },
    { name: 'telephone', type: 'tel', defaultValue: 'Numéro de téléphone' },
    { name: 'societe', type: 'text', defaultValue: 'Société' },
    { name: 'sujet', type: 'text', defaultValue: 'Sujet' },
    { name: 'newsletter', type: 'boolean', defaultValue: false },
    { name: 'confirmation', type: 'boolean', defaultValue: false },
  ],
});
