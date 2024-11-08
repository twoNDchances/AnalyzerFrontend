import { callAPI, notificator, checker, convertFormToJSON } from './general.js';

checker()

function updateJsonPreview() {
    const formData = {
        action_name: $('#actionName').val(),
        action_configuration: JSON.parse($('#actionConfiguration').val())
    }
    const jsonString = JSON.stringify(formData, null, 4)

    $('#jsonPreview').text(jsonString)
}

$('#webhookActionCreationForm input, #webhookActionCreationForm textarea').on('input', updateJsonPreview)

$(document).ready(function () {
    updateJsonPreview()
    $('#actionCreationButton').on('click', function (event) {
        event.preventDefault()
        let isActionNameError = false;
        let isActionConfigurationError = false;
        if (String($('#actionName').val()).length == 0) {
            isActionNameError = true
        }
        if (String($('#actionConfiguration').val()).length == 0) {
            isActionConfigurationError = true
        }
        if (isActionNameError == true || isActionConfigurationError == true) {
            $('#actionNameErrorField').empty().append(`<p class="error-text">Action Name is required</p>`)
            $('#actionConfigurationErrorField').empty().append(`<p class="error-text">Action Configuration is required</p>`)
            notificator('Error', 'Form validation fail!', 'error');
            return
        }

        const actionCreationJSONForm = {
            "actionName": $('#actionName').val(),
            "actionConfiguration": JSON.parse($('#actionConfiguration').val())
        }
        console.log(actionCreationJSONForm);
        
        callAPI(
            'POST',
            '/api/action/create/webhook',
            function () {
                $('#actionCreationButton').empty().append(`
                    <div class="loader"></div>
                `).attr('disabled', true)
            },
            function () {
                notificator('Success', 'Create action successfully', 'success')
                setTimeout(function () {
                    location.href = 'action_management.html'
                }, 1000)
            },
            function (event) {
                $('#actionCreationButton').empty().text('Create').removeAttr('disabled')
                const responseError = JSON.parse(event.responseText)
                notificator('Error', responseError.reason, 'error')
            },
            JSON.stringify(actionCreationJSONForm)
        )
    })
})