/**
 * @fileoverview Component to display commit detail in a 'ul' list
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class UlCommitDetail{
    constructor(commit) {
        this.commit = commit
        this.ul = document.createElement('ul')
    }

    createLi (field, value){
        const li = document.createElement('li')
        li.setAttribute('class', 'list-group-item')
        const strong = document.createElement('strong')
        strong.innerHTML = `${field}: `
        li.appendChild(strong)
        li.innerHTML += value
        return li
    }

    create(){
        this.ul.setAttribute('class', 'list-group w-100')
        this.ul.appendChild(this.createLi('Id', this.commit.id))
        this.ul.appendChild(this.createLi('Message', this.commit.message))
        this.ul.appendChild(this.createLi('Date', this.commit.date))
        this.ul.appendChild(this.createLi('Change files', this.commit.files_change_number))
        this.ul.appendChild(this.createLi('Author', `${this.commit.author_name}, ${this.commit.author_email}`))
        return this.ul
    }
}