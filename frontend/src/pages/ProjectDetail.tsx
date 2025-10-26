import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Project } from '@/data/projects';
import { useEffect, useState } from 'react';

// export const projects: Project[] = [
//   {
//     id: "1 ",
//     title: "E-commerce Platform",
//     description: "Plataforma completa de e-commerce com painel administrativo",
//     fullDescription:
//       "Plataforma de e-commerce desenvolvida com React, Node.js e PostgreSQL. Inclui sistema de pagamentos, gestão de produtos, carrinho de compras e painel administrativo completo.",
//     image: "/placeholder.svg",
//     tags: ["React", "Node.js", "PostgreSQL", "TypeScript"],
//     type: "individual",
//     links: {
//       site: "https://example.com",
//       github: "https://github.com/user/project",
//     },
//   },

// ];


export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | undefined>(undefined)

  // Função para carregar projetos da API
  async function carregarProjecto(url: string) {
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data)

      const adaptado: Project = {
        id: data.id,
        title: data.title,
        description: data.description,
        fullDescription: data.fullDescription || '',
        image: data.image,
        tags: data.tags || [],
        type: data.type,
        links: {
          site: data.link || '',
          github: data.github || '',
          playStore: data.playStore || '',
          appStore: data.appStore || ''
        }
      };

      setProject(adaptado);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    }
  }
  // Carregar projetos apenas uma vez
  useEffect(() => {

    // const interval = setInterval(() => {
    //   carregarProjecto('http://192.168.18.4:9090/api/v1/projects');
    // }, 100000)

    carregarProjecto(`http://192.168.18.4:9090/api/v1/projects/${id}`);

    // return () => clearInterval(interval);
  }, []);

  console.log(id)

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-heading font-bold mb-4">Projeto não encontrado</h1>
        <Button asChild>
          <Link to="/projetos">Voltar aos projetos</Link>
        </Button>
      </div>
    );
  }

 

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <Button asChild variant="ghost">
          <Link to="/projetos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos projetos
          </Link>
        </Button>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold">{project.title}</h1>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <img
          src={
            project.image && project.image == '' 
            ? project.image
            : '/placeholder.svg'
          }


          alt={project.title}
          className="w-full h-96 object-cover rounded-lg"
        />

        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>{project.fullDescription || project.description}</p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {project.links.site && (
                <Button asChild>
                  <a href={project.links.site} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ver site
                  </a>
                </Button>
              )}

              {project.links.github && (
                <Button asChild variant="outline">
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <SiGithub className="mr-2 h-4 w-4" />
                    Ver repositório
                  </a>
                </Button>
              )}

              {project.links.playStore && (
                <Button asChild variant="outline">
                  <a href={project.links.playStore} target="_blank" rel="noopener noreferrer">
                    Play Store
                  </a>
                </Button>
              )}

              {project.links.appStore && (
                <Button asChild variant="outline">
                  <a href={project.links.appStore} target="_blank" rel="noopener noreferrer">
                    App Store
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
