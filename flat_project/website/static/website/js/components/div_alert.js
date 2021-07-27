/**
 * @fileoverview Component to display a temporary alert message on the page
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class DivAlert{
    constructor(message, alertClass, lifeTime) {
        this.message = message
        this.alertClass = alertClass
        this.lifeTime = lifeTime
        this.div = document.createElement('div')
    }

    create(){
        this.div.setAttribute('class', 'div-alert-message');
        const alertDiv = document.createElement('div')
        alertDiv.setAttribute('class', `alert ${this.alertClass}`)
        alertDiv.setAttribute('role', 'alert')
        alertDiv.innerHTML = this.message
        this.div.appendChild(alertDiv)
        setTimeout(() => {
            this.destroy()
        }, this.lifeTime);
        return this.div
    }

    destroy(){
        this.div.remove()
    }
}