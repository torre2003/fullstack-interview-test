
/**
 * @fileoverview This service is manage the communication
 * with git api in the backend endpoint
  * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class Git{
    async getBranchList(){
        let url = '/api/branches/'
        let request = new Request(url, {
            method: 'GET',
            headers: new Headers()
        });
        const response = await fetch(request)
        let responseData = await response.json()
        if (response.status !== 200){
            responseData.error = true
        }
        return responseData
    }
    async getBranchDetail(branchName){
        let url = `/api/branches/${branchName}/`
        let request = new Request(url, {
            method: 'GET',
            headers: new Headers()
        });
        const response = await fetch(request)
        let responseData = await response.json()
        if (response.status !== 200){
            responseData.error = true
        }
        return responseData
    }
    async getCommitDetail(commitId){
        let url = `/api/commits/${commitId}/`
        let request = new Request(url, {
            method: 'GET',
            headers: new Headers()
        });
        const response = await fetch(request)
        let responseData = await response.json()
        if (response.status !== 200){
            responseData.error = true
        }
        return responseData
    }
    async getPullRequestList(){
        let url = `/api/pull-requests/`
        let request = new Request(url, {
            method: 'GET',
            headers: new Headers()
        });
        const response = await fetch(request)
        let responseData = await response.json()
        if (response.status !== 200){
            responseData.error = true
        }
        return responseData
    }
    async getPullRequestDetail(pullRequestId){
        let url = `/api/pull-requests/${pullRequestId}/`
        let request = new Request(url, {
            method: 'GET',
            headers: new Headers()
        });
        const response = await fetch(request)
        let responseData = await response.json()
        if (response.status !== 200){
            responseData.error = true
        }
        return responseData
    }
    async createPullRequest(data){
        let url = `/api/pull-requests/`
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let request = new Request(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        const response = await fetch(request)
        let responseData = await response.json()
        if (response.status !== 201){
            responseData.error = true
        }
        return responseData
    }
    async changeStatusPullRequest(pullRequestId, status) {
        let url = `/api/pull-requests/${pullRequestId}/`
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let request = new Request(url, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify({status: status})
        });
        const response = await fetch(request)
        let responseData = await response.json()
        if (response.status !== 200){
            responseData.error = true
        }
        return responseData
    }
}