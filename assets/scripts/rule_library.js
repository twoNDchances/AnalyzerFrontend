import { fetchData, notificator, checker } from "./general.js";

checker()

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
            $('#XSS').empty().append(`
                <div class="small-item-center">
                    <div class="loader"></div>
                </div>
            `)
        },
        function (response) {
            let sqliCounter = 0;
            let xssCounter = 0;
            for (let index = 0; index < response.data.length; index++) {
                const element = response.data[index];
                if (element.rule_type == 'SQLI') {
                    sqliCounter++
                }
                else if (element.rule_type == 'XSS') {
                    xssCounter++
                }
            }
            if (sqliCounter == 0) {
                $('#SQLI').empty().append(`
                    <div class="item-center">
                        <p>Empty</p>
                    </div>
                `)
            }
            else {
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
                    if (element.rule_type == 'SQLI') {
                        $('#ruleLibraryTableOfSQLI').append(`
                            <tr id="ruleManagementRowOfSQLI_${element.id}">
                                <th class="text-center">${element.id}</th>
                                <td class="text-center">${element.rule_type}</td>
                                <td>${element.rule_execution}</td>
                                <td>${element.rule_description}</td>
                            </tr>
                        `)
                    }
                }
            }

            if (xssCounter == 0) {
                $('#XSS').empty().append(`
                    <div class="item-center">
                        <p>Empty</p>
                    </div>
                `)
            }
            else {
                $('#XSS').empty().append(`
                    <table class="mb-0 table table-striped ruleLibraryTable">
                        <thead>
                            <tr>
                                <th class="text-center">ID</th>
                                <th class="text-center">Rule Type</th>
                                <th>Rule Execution</th>
                                <th>Rule Description</th>
                            </tr>
                        </thead>
                        <tbody id="ruleLibraryTableOfXSS">
                        </tbody>
                    </table>
                `)
                for (let index = 0; index < response.data.length; index++) {
                    const element = response.data[index];
                    if (element.rule_type == 'XSS') {
                        $('#ruleLibraryTableOfXSS').append(`
                            <tr id="ruleManagementRowOfXSS_${element.id}">
                                <th class="text-center">${element.id}</th>
                                <td class="text-center">${element.rule_type}</td>
                                <td>${element.rule_execution}</td>
                                <td>${element.rule_description}</td>
                            </tr>
                        `)
                    }
                }
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