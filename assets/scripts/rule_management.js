import { checker, notificator, callAPI, fetchData } from './general.js';

checker()

$(document).ready(function () {
    // Fetch SQLI
    fetchData(
        '/api/sqli/list',
        'GET',
        null,
        function() {
            $('#ruleManagementOfSQLI').empty().append(`
                <div class="small-item-center">
                    <div class="loader"></div>
                </div>
            `)
        },
        function (responseData) {
            $('#ruleManagementOfSQLI').empty().append(`
                <table class="mb-0 table table-striped ruleManagementTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Rule Name</th>
                            <th>Is Enabled</th>
                            <th>Target Field</th>
                            <th>IP Root Cause Field</th>
                            <th>Regex Matcher</th>
                            <th>Rule Library</th>
                            <th>Action</th>
                            <th>View Details</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody id="ruleManagementTableOfSQLI">
                    </tbody>
                </table>
            `)
            for (let index = 0; index < responseData.data.length; index++) {
                const element = responseData.data[index];
                $('#ruleManagementTableOfSQLI').append(`
                    <tr id="ruleManagementRowOfSQLI_${element.id}">
                        <th>${element.id}</th>
                        <td>${element.rule_name}</td>
                        <td>${element.is_enabled}</td>
                        <td>${element.target_field}</td>
                        <td>${element.ip_root_cause_field}</td>
                        <td>${element.regex_matcher}</td>
                        <td>${element.rule_library}</td>
                        <td>${element.action_id}</td>
                        <td>
                            <button class="mb-2 mr-2 btn btn-light">
                                <i class="fa fa-eye"></i>
                            </button>
                        </td>
                        <td>
                            <button class="mb-2 mr-2 btn btn-danger">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `)
            }
        },
        function (status, errorMessage) {
            if (status == 404) {
                $('#ruleManagementOfSQLI').empty().append(`
                    <div class="item-center">
                        <p>Empty</p>
                    </div>
                `)
            }
            else {
                notificator('Error', 'Can\'t fetch rules from Analyzer backend', 'error')
                $('#ruleManagementOfSQLI').empty().append(`
                    <div class="item-center">
                        <p>Error</p>
                    </div>
                `)
            }
        }
    )
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

    $('#ruleName').on('input', function() {
        const searchTerm = $(this).val().toLowerCase()
        $('.ruleManagementTable').each(function() {
            $(this).find('tbody tr').each(function() {
                let rowContainsTerm = false
                $(this).find('td').each(function() {
                    const cellText = $(this).text().toLowerCase()
                    if (cellText.includes(searchTerm)) {
                        rowContainsTerm = true
                        return false
                    }
                });

                if (rowContainsTerm) {
                    $(this).show()
                } else {
                    $(this).hide()
                }
            });
        });
    });
    // callAPI(
    //     'GET',
    //     '/api/sqli/list',
    //     function () {
    //         $('#bodyContent').empty().append(`
    //             <div class="item-center">
    //                 <div class="loader"></div>
    //             </div>
    //         `)
    //     },
    //     function () {
    //         $('#bodyContent').empty().append(``)
    //     },
    //     function () {
    //         $('#bodyContent').empty()
    //         notificator('Error', 'Can\'t fetch rules from Analyzer backend', 'error')
    //     }
    // )
})