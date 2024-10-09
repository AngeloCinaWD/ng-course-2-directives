import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[ngxUnless]",
})
export class NgxUnlessDirective {
  // per evitare che la view venga creata anche se già presente e per evirae che venga chiamato il clear anche se la view è stata già tolta, creiamo una proprietà booleana da utlizzare nelle condizioni del metodo setter
  visible: boolean = false;

  // per avere un riferimento al nostro ng-template abbiamo bisogno di iniettare nel costruttore una variabile TemplateRef
  // una volta che si ha il riferimento abbiamo bisogno di un'altra variabile che ci permetta di istanziare l'ng-template, una variabile di tipo ViewContainerRef
  // https://stackoverflow.com/questions/53374430/difference-between-elementref-and-templateref-in-angular4
  //  https://www.youtube.com/watch?v=uQqp1z7FpJY&ab_channel=AngularConnect
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  // @Input con metodo set
  // riceviamo l'input property come setter method con lo stesso nome della proprietà
  @Input()
  set ngxUnless(condition: boolean) {
    // se la condizione è falsa istanziamo il template
    // in questo modo creiamo un nuovo template al posto dell'ng-template
    // utilizziamo la proprietà booleana nelle condizioni in modo da essere sicuri che i metodi create e clear non vengano chiamati più volte per la stessa istanza
    if (!condition && !this.visible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      // una volta creata l'istanza settiamo la proprietà visible su true
      this.visible = true;
    }
    // in caso la condizione è vera rimuoviamo tutto quello che è presente nel viewContainer
    // per utilizzare il flag abbiamo bisogno di un else if e non di un else
    else if (condition && this.visible) {
      // else {
      this.viewContainer.clear();
      // una volta rimossa l'istanza settiamo la proprietà visible su false
      this.visible = false;
    }
  }
}
