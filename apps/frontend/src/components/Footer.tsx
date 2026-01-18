import { ArrowRight, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 font-sans">
      <Container>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link to="/" className="inline-block">
              <h2 className="font-serif text-2xl text-white font-bold tracking-tight">
                Portal Universitário
              </h2>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
              Conectando estudantes, professores e pesquisadores através da informação. 
              Sua fonte diária de inovação, vida no campus e descobertas acadêmicas.
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-12">
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
              <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                <Mail className="size-5 text-blue-500" />
                Receba as novidades da semana
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Junte-se a mais de 10.000 acadêmicos. Sem spam, apenas conteúdo relevante.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="seu@email.edu.br" 
                  className="flex-1 bg-slate-950 border border-slate-800 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder:text-slate-600 transition-all"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Inscrever-se
                  <ArrowRight className="size-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-12 border-t border-slate-900">
          
          <FooterColumn title="Categorias">
            <FooterLink to="#">Vida no Campus</FooterLink>
            <FooterLink to="#">Pesquisa & Inovação</FooterLink>
            <FooterLink to="#">Esportes</FooterLink>
            <FooterLink to="#">Eventos</FooterLink>
          </FooterColumn>

          <FooterColumn title="Recursos">
            <FooterLink to="https://si3.ufc.br/sigaa">Portal do Aluno</FooterLink>
            <FooterLink to="https://biblioteca.ufc.br/pt/">Biblioteca</FooterLink>
            <FooterLink to="https://www.ufc.br/calendario-universitario/">Calendário Acadêmico</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink to="#">Política de Privacidade</FooterLink>
            <FooterLink to="#">Termos de Uso</FooterLink>
            <FooterLink to="#">Acessibilidade</FooterLink>
            <FooterLink to="#">Contato</FooterLink>
          </FooterColumn>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} Portal Universitário. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1">
            Desenvolvido com <span className="text-red-500">♥</span> pelo time Atlas.
          </p>
        </div>

      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-white font-medium text-sm tracking-wide uppercase">{title}</h4>
      <ul className="flex flex-col gap-2">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-sm hover:text-blue-400 transition-colors">
        {children}
      </Link>
    </li>
  );
}

