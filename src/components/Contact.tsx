import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contato" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
            Contato
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Confira nosso <span className="text-primary">Contato</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-2xl shadow-card flex items-start gap-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  Endereço
                </h3>
                <p className="text-muted-foreground">
                  R. Bento Gonçalves, 10 - Centro
                  <br />
                  Marau - RS, 99150-000
                </p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-card flex items-start gap-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  Telefone
                </h3>
                <a
                  href="tel:+555433429479"
                  className="text-secondary hover:text-hospicard-blue-dark font-medium transition-colors"
                >
                  (54) 3342-9479
                </a>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-card flex items-start gap-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  Horário de Atendimento
                </h3>
                <p className="text-muted-foreground">
                  Segunda a Sexta: 8h às 18h
                  <br />
                  Sábado: 8h às 12h
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-card rounded-2xl shadow-card overflow-hidden h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.9372037024!2d-52.19944542394679!3d-28.44773087572869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e2c1b41e3f5b83%3A0x6b5f77a4c3f5c0e9!2sR.%20Bento%20Gon%C3%A7alves%2C%2010%20-%20Centro%2C%20Marau%20-%20RS%2C%2099150-000!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Hospital Cristo Redentor"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
