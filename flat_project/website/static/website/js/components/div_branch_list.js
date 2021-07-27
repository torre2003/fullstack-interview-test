/**
 * @fileoverview Component to display a list of branch in a 'div' element
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class DivBranchList{
    constructor(branchItems) {
        this.branchItems = branchItems
        this.div = document.createElement('div')
    }

    create(){
        this.branchItems.forEach(branchItem => {
            const divELement = document.createElement('div')
            divELement.setAttribute('class', 'd-flex pt-3')

            const img = document.createElement('img')
            img.setAttribute('class', 'flex-shrink-0 me-2 rounded branch-image')
            img.setAttribute('width', '32')
            img.setAttribute('height', '32')
            divELement.appendChild(img)

            const p = document.createElement('p')
            p.setAttribute('class', 'pb-3 mb-0 small lh-sm border-bottom  w-100')
            divELement.appendChild(p)

            const a = document.createElement('a')
            a.setAttribute('href', `/branch?branch=${branchItem}`)
            p.appendChild(a)
            
            const strong = document.createElement('strong')
            strong.setAttribute('class', 'd-block text-gray-dark')
            strong.innerHTML = branchItem
            a.appendChild(strong)

            this.div.appendChild(divELement)
        });

        return this.div
    }
}