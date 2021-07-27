/**
 * @fileoverview Component to create 'form' element for create a new pull request
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class FormPullRequest{
    constructor(branchItems) {
        this.branchItems = branchItems
        this.form = document.createElement('form')
    }

    appendBranchOptions(selectBranch){
        const defautlOption = document.createElement('option')
        defautlOption.setAttribute('value', '')
        defautlOption.innerHTML = '--- Select branch ---'
        selectBranch.appendChild(defautlOption)
        this.branchItems.forEach(
            branch => {
                const option = document.createElement('option')
                option.setAttribute('value', branch)
                option.innerHTML = branch
                selectBranch.appendChild(option)
            }
        ); 
    }

    showFormErrors(errors){
        let errorElements = this.form.querySelectorAll('div.invalid-feedback')
        errorElements.forEach( error_element => {
            error_element.remove()
        })
        let fields = ["author", "title", "description", "status", "base_branch", "compare_branch"]
        for (const key in errors) {
            if(fields.includes(key)){
                const fieldElement = this.form.querySelector(`*[name=${key}]`)
                const divError = document.createElement('div')
                divError.setAttribute('class', 'invalid-feedback d-block')
                divError.innerHTML = errors[key].join()
                fieldElement.parentNode.insertBefore(divError, fieldElement.nextSibling);
            }else if (key == 'non_field_errors'){
                const divError = document.createElement('div')
                divError.setAttribute('class', 'invalid-feedback d-block')
                divError.innerHTML = errors[key].join()
                this.form.prepend(divError)
            }
        }
    }

    create(onFormSubmit){
        this.form.setAttribute('class', 'w-100')
        this.form.onsubmit = () => {
            return false;
        }

        const divRow0 = document.createElement('div')
        divRow0.setAttribute('class', 'row')
        const divCol0 = document.createElement('div')
        divCol0.setAttribute('class', 'col-12')
        divRow0.appendChild(divCol0)
        const labelAuthor = document.createElement('label')
        labelAuthor.setAttribute('for', 'author')
        labelAuthor.innerHTML = 'Author'
        divCol0.appendChild(labelAuthor)
        const inputAuthor = document.createElement('input')
        inputAuthor.setAttribute('type', 'text')
        inputAuthor.setAttribute('name', 'author')
        inputAuthor.setAttribute('class', 'form-control')
        inputAuthor.setAttribute('id', 'author')
        inputAuthor.setAttribute('placeholder', 'Example author')
        divCol0.appendChild(inputAuthor)
        this.form.appendChild(divRow0)

        const divRow1 = document.createElement('div')
        divRow1.setAttribute('class', 'row')
        const divCol1 = document.createElement('div')
        divCol1.setAttribute('class', 'col-12')
        divRow1.appendChild(divCol1)
        const labelTitle = document.createElement('label')
        labelTitle.setAttribute('for', 'title')
        labelTitle.innerHTML = 'Title'
        divCol1.appendChild(labelTitle)
        const inputTitle = document.createElement('input')
        inputTitle.setAttribute('type', 'text')
        inputTitle.setAttribute('name', 'title')
        inputTitle.setAttribute('class', 'form-control')
        inputTitle.setAttribute('id', 'title')
        inputTitle.setAttribute('placeholder', 'Pull request title')
        divCol1.appendChild(inputTitle)
        this.form.appendChild(divRow1)

        const divRow2 = document.createElement('div')
        divRow2.setAttribute('class', 'row')
        const divCol2 = document.createElement('div')
        divCol2.setAttribute('class', 'col-12')
        divRow2.appendChild(divCol2)
        const labelDescription = document.createElement('label')
        labelDescription.setAttribute('for', 'description')
        labelDescription.innerHTML = 'Description'
        divCol2.appendChild(labelDescription)
        const textareaDescription = document.createElement('textarea')
        textareaDescription.setAttribute('id', 'description')
        textareaDescription.setAttribute('name', 'description')
        textareaDescription.setAttribute('class', 'form-control')
        textareaDescription.setAttribute('rows', '3')
        textareaDescription.setAttribute('placeholder', 'Description for your pull request')
        divCol2.appendChild(textareaDescription)
        this.form.appendChild(divRow2)

        const divRow3 = document.createElement('div')
        divRow3.setAttribute('class', 'row')
        const divCol3 = document.createElement('div')
        divCol3.setAttribute('class', 'col-6')
        divRow3.appendChild(divCol3)
        const labelBaseBranch = document.createElement('label')
        labelBaseBranch.setAttribute('for', 'baseBranch')
        labelBaseBranch.innerHTML = 'Base branch'
        divCol3.appendChild(labelBaseBranch)
        const selectBaseBranch = document.createElement('select')
        selectBaseBranch.setAttribute('id', 'baseBranch')
        selectBaseBranch.setAttribute('name', 'base_branch')
        selectBaseBranch.setAttribute('class', 'form-control')
        this.appendBranchOptions(selectBaseBranch)
        divCol3.appendChild(selectBaseBranch)

        const divCol4 = document.createElement('div')
        divCol4.setAttribute('class', 'col-6')
        divRow3.appendChild(divCol4)
        const labelCompareBranch = document.createElement('label')
        labelCompareBranch.setAttribute('for', 'compareBranch')
        labelCompareBranch.innerHTML = 'Compare branch'
        divCol4.appendChild(labelCompareBranch)
        const selectCompareBranch = document.createElement('select')
        selectCompareBranch.setAttribute('id', 'compareBranch')
        selectCompareBranch.setAttribute('name', 'compare_branch')
        selectCompareBranch.setAttribute('class', 'form-control')
        divCol4.appendChild(selectCompareBranch)
        this.appendBranchOptions(selectCompareBranch)
        this.form.appendChild(divRow3)

        const divRow5 = document.createElement('div')
        divRow5.setAttribute('class', 'row')
        const divCol5 = document.createElement('div')
        divCol5.setAttribute('class', 'col-12')
        divRow5.appendChild(divCol5)
        const divCol6 = document.createElement('div')
        divCol6.setAttribute('class', 'my-3')
        divCol5.appendChild(divCol6)

        const labelStatus = document.createElement('label')
        labelStatus.setAttribute('for', 'status')
        labelStatus.innerHTML = 'Status'
        divCol6.appendChild(labelStatus)

        const divFormCheck1 = document.createElement('div')
        divFormCheck1.setAttribute('class', 'form-check')

        const inputStatusOpen = document.createElement('input')
        inputStatusOpen.setAttribute('id', 'open')
        inputStatusOpen.setAttribute('name', 'status')
        inputStatusOpen.setAttribute('value', 'open')
        inputStatusOpen.setAttribute('type', 'radio')
        inputStatusOpen.setAttribute('class', 'form-check-input')
        inputStatusOpen.setAttribute('checked', '')
        inputStatusOpen.setAttribute('required', '')
        divFormCheck1.appendChild(inputStatusOpen)

        const labelStatusOpen = document.createElement('label')
        labelStatusOpen.setAttribute('for', 'open')
        labelStatusOpen.setAttribute('class', 'form-check-label')
        labelStatusOpen.innerHTML = 'Open'
        divFormCheck1.appendChild(labelStatusOpen)
        divCol6.appendChild(divFormCheck1)

        const divFormCheck2 = document.createElement('div')
        divFormCheck2.setAttribute('class', 'form-check')

        const inputStatusMerged = document.createElement('input')
        inputStatusMerged.setAttribute('id', 'merged')
        inputStatusMerged.setAttribute('name', 'status')
        inputStatusMerged.setAttribute('value', 'open')
        inputStatusMerged.setAttribute('type', 'radio')
        inputStatusMerged.setAttribute('class', 'form-check-input')
        inputStatusMerged.setAttribute('required', '')
        divFormCheck2.appendChild(inputStatusMerged)

        const labelStatusMerged = document.createElement('label')
        labelStatusMerged.setAttribute('for', 'merged')
        labelStatusMerged.setAttribute('class', 'form-check-label')
        labelStatusMerged.innerHTML = 'Merged'
        divFormCheck2.appendChild(labelStatusMerged)
        divCol6.appendChild(divFormCheck2)
        this.form.appendChild(divRow5)

        const buttonSubmit = document.createElement('button')
        buttonSubmit.setAttribute('class', 'btn btn-primary mt-3')
        buttonSubmit.setAttribute('type', 'submit')
        buttonSubmit.innerHTML = 'Create Pull Request'
        buttonSubmit.onclick = () => {
            onFormSubmit(this)
        }

        this.form.appendChild(buttonSubmit)

        return this.form
    }
}