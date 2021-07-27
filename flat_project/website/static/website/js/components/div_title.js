/**
 * @fileoverview Component to display a page title with a optional link
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class DivTitle{
    constructor(title, subTitle, urlSubTitle) {
        this.title = title
        this.subTitle = subTitle
        this.urlSubTitle = urlSubTitle
        this.div = document.createElement('div')
    }

    create(){
        this.div.setAttribute('class', 'lh-1');
        
        const h1 = document.createElement('h1')
        h1.setAttribute('class', 'h6 mb-0 text-white lh-1');
        h1.innerHTML = this.title
        this.div.appendChild(h1)

        if (this.subTitle){
            const small = document.createElement('small')
            if (this.urlSubTitle){
                const a = document.createElement('a')
                a.setAttribute('class', 'text-white')
                a.setAttribute('href', this.urlSubTitle);
                a.innerHTML = this.subTitle 
                small.appendChild(a)
            }else{
                small.innerHTML = this.subTitle 
            }
            this.div.append(small)
        }
        return this.div
    }
}