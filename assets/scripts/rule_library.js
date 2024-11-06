import { fetchData, notificator } from "./general.js";

$(document).ready(function () {
    // Fetch filter
    fetchData(
        '/api/rule/rule-library?ruleType=true',
        'GET',
        null,
        function () {
            $('#ruleTypeFilter').empty().append(`<div class="loader"></div>`)
        },
        function (data) {
            $('#ruleTypeFilter').empty().append(`
                <select class="mb-2 form-control-lg form-control" id="ruleType">
                    <option value="null">-----</option>
                </select>
            `)
            for (let index = 0; index < data.data.length; index++) {
                const element = data.data[index];
                if (element == 'SQLI') {
                    $('#ruleType').append(`<option value="${element}">SQL Injection (SQLI)</option>`)
                }
                else if (element == 'XSS') {
                    $('#ruleType').append(`<option value="${element}">Cross Site Scripting (XSS)</option>`)
                }
            }
            $('#ruleType').on('change', function () {
                const ruleTypeList = ['SQLI', 'XSS']                
                for (let index = 0; index < ruleTypeList.length; index++) {
                    const element = ruleTypeList[index];
                    if ($('#ruleType').val() == 'null') {                        
                        $(`#cardOf${element}`).show()
                    }
                    else {
                        if ($('#ruleType').val() != element) {
                            $(`#cardOf${element}`).hide()
                        }
                        else {
                            $(`#cardOf${element}`).show()
                        }
                    }
                }
            })
        },
        function () {
            $('#ruleTypeFilter').empty().append(`
                <select class="mb-2 form-control-lg form-control" id="ruleType">
                    <option value="null">-----</option>
                </select>
            `)
            notificator('Error', 'Can\'t fetch rule type from Rule Library!', 'error')
        }
    )
    // Fetch SQLI
    fetchData(
        '/api/rule/rule-library',
        'GET',
        null,
        function () {
            $('#SQLI').empty().append(`
                <div class="small-item-center">
                    <div class="loader"></div>
                </div>
            `)
        },
        function (response) {
            $('#SQLI').empty().append(`
                <table class="mb-0 table table-striped ruleLibraryTable">
                    <thead>
                        <tr>
                            <th class="text-center">ID</th>
                            <th class="text-center">Rule Type</th>
                            <th>Rule Execution</th>
                            <th>Rule Description</th>
                        </tr>
                    </thead>
                    <tbody id="ruleLibraryTableOfSQLI">
                    </tbody>
                </table>
            `)
            for (let index = 0; index < response.data.length; index++) {
                const element = response.data[index];
                $('#ruleLibraryTableOfSQLI').append(`
                    <tr id="ruleManagementRowOfSQLI_${element.id}">
                        <th class="text-center">${element.id}</th>
                        <td class="text-center">${element.rule_type}</td>
                        <td>${element.rule_execution}</td>
                        <td>${element.rule_description}</td>
                    </tr>
                `)
            }
        },
        function (status, errorMessage) {
            if (status == 404) {
                $('#SQLI').empty().append(`
                    <div class="item-center">
                        <p>Empty</p>
                    </div>
                `)
            }
            else {
                notificator('Error', 'Can\'t fetch SQL Injection Rule Library')
                $('#SQLI').empty().append(`
                    <div class="item-center">
                        <p>Error</p>
                    </div>
                `)
            }
        }
    )
})