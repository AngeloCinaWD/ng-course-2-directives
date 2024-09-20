import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from "@angular/core";

// in una direttiva c'è il decorator @Directive
// il selector è il nome con cui verrà utilizzta la direttiva, passandolo come attributo all'elemento nel template
// ad es. <div highlighted></div>
// è possibile esportare una direttiva per poetrvi accedere direttamente in un template o in una classe ts
// ad esempio pechè la direttiva contiene dei metodi che vogliono essere utilizzati
// si fa utilizzando la proprietà exportAs nel decoratore @Directive e assegnandole un nome che verrà utilizzato nel template
@Directive({
  selector: "[highlighted]",
  exportAs: "direttivaHL",
})
export class HighlightedDirective {
  // posso passare valori dall'esterno alla direttiva ed utilizzarli nei metodi
  // utilizzo il decoratore @Input('nomeproprietà')
  @Input("highlighted")
  isHighlighted: boolean = false;

  // EVENTEMITTER
  // una direttiva può emettere eventi come fa un componente
  // creo un evento e lo emetterò quando cambia il valore di isHighlighted
  @Output("toggleIsHighLighted")
  toggleIsHighLighted = new EventEmitter<Boolean>();

  // proprietà ElementRef che riferisce all'elemento DOM a cui è applicata la direttiva
  constructor(private elRef: ElementRef) {
    console.log(elRef.nativeElement);
    console.log(elRef.nativeElement.style);
    console.log(elRef.nativeElement.attributes);
  }

  // per avere un riferimento all'elemento DOM nativo a cui applichiamo la direttiva si utilizza il decorator @HostBinding
  // assegnamo una classe css all'elemento
  // creiamo un metodo GET che ritorna quello che vogliamo fare, il nome della classe che vogliamo assegnare
  // nel decoratore identifichiamo a quale proprietà DOM (dell'elemento nativo) vogliamo assegnare il valore, in questo caso className (mi restituisce una stringa coi nomi delle classi assegnate all'elemento), il mio metodo riscrive questa proprietà
  // fra le proprietà utili c'è style che elenca tutte gli stili css (ad esempio border, backgorund)
  // se volessi aggiungere un bordo colorato di 1px nell'@HostBinding passerei come nome della proprietà da modificare "style.border" e return "1px solid green"

  @HostBinding("className")
  get cssClasses() {
    return "highlighted course-card";
  }

  // mettendo più metodi posso far fare più cose alla direttiva
  @HostBinding("style.border")
  get cssBorder() {
    return "3px solid green";
  }

  // metodo che ritorna il valore dell'@Input isHighlighted passato dall'esterno
  // class l'ho passato per far funzionare il tutto, class è una shorthand che mi permette di accedere alle classi di un elemento
  // posso utilizzarlo anche per passare classi, class.nomeClasse e ritornare il valore true
  @HostBinding("class.highlightedMouse")
  get getValueIsHighlighted() {
    return this.isHighlighted;
  }

  // possiamo settare attributi dell'elemento tramite @HostBinding, utilizzando l'oggetto attr (https://developer.mozilla.org/en-US/docs/Web/API/Attr) che ha un elemento DOM
  // in questo caso gli sto dicendo di aggiungere la proprietà disabled e darle valore true
  @HostBinding("attr.disabled")
  get isDisabled() {
    return true;
  }

  // esempio utilizzando la proprietà classList, che è una DOMTokenList e che ha i suoi metodi, come add(), remove(), contains(), toggle() (https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList)
  // aggiungo la classe che voglio alla lista di stringhe
  // per fare questo ho creato una proprietà ElementRef nel costruttore che riferisce all'elemento DOM a cui è applicata la direttiva
  // @HostBinding("classList")
  // get cssClasses() {
  //   let classes = this.elRef.nativeElement.classList;
  //   console.log(classes);
  //   return classes.add("highlighted");
  // }

  // @HOSTLISTENER DECORATOR
  // ascoltare eventi in una direttiva, in argomento il nome dell'evento che si scatena sull'elemento
  // non devono essere metodi GET, questi vengono richiamati al verificarsi dell'evento
  // modificando il valore dell'@Input verrà chiamato il metodo get getValueIsHighlighted() che ritorna vero o falso per aggiungere una classe tramite shorthand class.nomeClasse
  // possiamo passare un array come secondo argomento del decorator per passare argomenti al metodo
  // uno è $event che ci dà informazioni sull'evento triggerato, il secondo lo sto passando per prova e gli devo assegnare il valore nel metodo
  @HostListener("mouseover", ["$event", "ciao"])
  mouseOver($event: MouseEvent, elRef: ElementRef) {
    elRef = this.elRef;
    console.log(elRef);
    console.log($event);

    this.isHighlighted = true;
    this.toggleIsHighLighted.emit(this.isHighlighted);
  }

  @HostListener("mouseleave")
  mouseLeave() {
    this.isHighlighted = false;
    this.toggleIsHighLighted.emit(this.isHighlighted);
  }

  // METODO CHE UTILIZZERO' NEL TEMPLATE
  toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.toggleIsHighLighted.emit(this.isHighlighted);
  }
}
