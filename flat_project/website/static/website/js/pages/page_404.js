/**
 * @fileoverview Controller for page Page404
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class Page404{
    constructor(titleId,){
        this.title = document.getElementById(titleId)
    }
    async render(){
        const divTitle = new DivTitle(
            `Page not found!`,
            'back to home',
            '/'
        ).create()
        this.title.appendChild(divTitle)
    }
}

new Page404('titleContainer').render()