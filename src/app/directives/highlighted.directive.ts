import { Directive } from "@angular/core";

// in una direttiva c'è il decorator @Directive
// il selector è il nome con cui verrà utilizzta la direttiva, passandolo come attributo all'elemento nel template
// ad es. <div highlighted></div>
@Directive({
  selector: "[highlighted]",
})
export class HighlightedDirective {
  constructor() {
    console.log("direttiva creata");
  }
}
