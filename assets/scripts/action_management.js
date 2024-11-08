import { fetchData, getCookie, notificator, checker } from './general.js';

checker();

$(document).ready(function () {
    fetchData(
        '/api/action/list',
        'GET',
        null,
        function () {
            $('#actionManagementOfWebhook').empty().append(`
                <div class="small-item-center">
                    <div class="loader"></div>
                </div>
            `)
            $('#actionManagementOfEmail').empty().append(`
                <div class="small-item-center">
                    <div class="loader"></div>
                </div>
            `)
        },
        function (responseData) {
            let webhookData = []
            let emailData = []
            for (let index = 0; index < responseData.data.length; index++) {
                const element = responseData.data[index];
                if (element.action_type == 'webhook') {
                    webhookData.push(element)
                }
                else if (element.action_type == 'email') {
                    emailData.push(element)
                }
            }
            if (webhookData.length == 0) {
                $('#actionManagementOfWebhook').empty().append(`
                    <div class="item-center">
                        <p>Empty</p>
                    </div>
                `)
            }
            else {
                $('#actionManagementOfWebhook').empty().append(`
                    <table class="mb-0 table table-striped actionManagementTable">
                        <thead>
                            <tr>
                                <th class="text-center">ID</th>
                                <th class="text-center">Action Name</th>
                                <th class="text-center">Action Type</th>
                                <th class="text-center">Action Configuration</th>
                                <th class="text-center">Action Details</th>
                                <th class="text-center">Remove</th>
                            </tr>
                        </thead>
                        <tbody id="actionManagementTableOfWebhook">
                        </tbody>
                    </table>
                `)
                for (let index = 0; index < webhookData.length; index++) {
                    const element = webhookData[index];
                    $('#actionManagementTableOfWebhook').append(`
                        <tr id="actionManagementRowOfWebhook_${element.id}">
                            <th class="text-center">${element.id}</th>
                            <td class="text-center">${element.action_name}</td>
                            <td class="text-center">${element.action_type}</td>
                            <td><pre>${JSON.stringify(JSON.parse(element.action_configuration), null, 4)}</pre></td>
                            <td class="text-center">
                                <button class="mb-2 mr-2 btn btn-light">
                                    <i class="fa fa-eye"></i>
                                </button>
                            </td>
                            <td class="text-center">
                                <button class="mb-2 mr-2 btn btn-danger">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `)
                }
            }
            if (emailData.length == 0) {
                $('#actionManagementOfEmail').empty().append(`
                    <div class="item-center">
                        <p>Empty</p>
                    </div>
                `)
            }
            else {
                $('#actionManagementOfWebhook').empty().append(`
                    <table class="mb-0 table table-striped actionManagementTable">
                        <thead>
                            <tr>
                                <th class="text-center">ID</th>
                                <th class="text-center">Action Name</th>
                                <th class="text-center">Action Type</th>
                                <th class="text-center">Action Configuration</th>
                                <th class="text-center">Action Details</th>
                                <th class="text-center">Remove</th>
                            </tr>
                        </thead>
                        <tbody id="actionManagementTableOfEmail">
                        </tbody>
                    </table>
                `)
                for (let index = 0; index < emailData.length; index++) {
                    const element = emailData[index];
                    $('#actionManagementTableOfEmail').append(`
                        <tr id="actionManagementRowOfEmail_${element.id}">
                            <th class="text-center">${element.id}</th>
                            <td class="text-center">${element.action_name}</td>
                            <td class="text-center">${element.action_type}</td>
                            <td><pre>${JSON.stringify(JSON.parse(element.action_configuration), null, 4)}</pre></td>
                            <td class="text-center">
                                <button class="mb-2 mr-2 btn btn-light">
                                    <i class="fa fa-eye"></i>
                                </button>
                            </td>
                            <td class="text-center">
                                <button class="mb-2 mr-2 btn btn-danger">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `)
                }
            }
            $('#actionType').on('change', function () {
                const ruleTypeList = ['webhook', 'email']
                for (let index = 0; index < ruleTypeList.length; index++) {
                    const element = ruleTypeList[index];
                    if ($('#actionType').val() == 'null') {
                        $(`#cardOf${element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()}`).show()
                    }
                    else {
                        if ($('#actionType').val() != element) {
                            $(`#cardOf${element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()}`).hide()
                        }
                        else {
                            $(`#cardOf${element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()}`).show()
                        }
                    }
                }
            })
        },
        function (status, errorMessage) {
            console.log(errorMessage);
            
            if (status == 404) {
                $('#actionManagementOfWebhook').empty().append(`
                    <div class="item-center">
                        <p>Empty</p>
                    </div>
                `)
                $('#actionManagementOfEmail').empty().append(`
                    <div class="item-center">
                        <p>Empty</p>
                    </div>
                `)
            }
            else {
                notificator('Error', 'Can\'t fetch action from Analyzer backend', 'error')
                $('#actionManagementOfWebhook').empty().append(`
                    <div class="item-center">
                        <p>Error</p>
                    </div>
                `)
                $('#actionManagementOfEmail').empty().append(`
                    <div class="item-center">
                        <p>Error</p>
                    </div>
                `)
            }
        }
    )
})