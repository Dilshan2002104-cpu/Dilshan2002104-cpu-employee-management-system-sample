getAllEmployees();
function saveEmployee() {
    let name = $('#exampleFormControlInput2').val();
    let address = $('#exampleFormControlInput3').val(); // Changed to lowercase 'address' to follow JavaScript naming conventions
    let number = $('#exampleFormControlInput4').val();

    $.ajax({
        url: 'http://localhost:8081/api/v1/employee/saveEmployee',  // Replace with your actual server endpoint
        method: 'POST',
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({
            "empid": "",
            "empname":name,
            "empaddress":address,
            "empMNumber":number
        }),
        success:function(data){
            alert("Saved Successfully");
            getAllEmployees();
        },
        error:function(xhr,exception){
            alert("Something went wrong");
        }
    });
}

function updateEmployee() {
    let empID = $('#exampleFormControlInput1').val()
    let name = $('#exampleFormControlInput2').val();
    let address = $('#exampleFormControlInput3').val();
    let number = $('#exampleFormControlInput4').val();

    $.ajax({
        url: 'http://localhost:8081/api/v1/employee/updateEmployee',
        method: 'PUT',
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({
            "empid": empID,
            "empname":name,
            "empaddress":address,
            "empMNumber":number
        }),
        success:function(data){
            alert("Updated Successfully");
            getAllEmployees();
        },
        error:function(xhr,exception){
            alert("Something went wrong");
        }
    });
}

function deleteEmployee() {
    let empID = $('#exampleFormControlInput1').val()

    $.ajax({
        url: 'http://localhost:8081/api/v1/employee/deleteEmployee/'+empID,
        method: 'DELETE',
        contentType: 'application/json',
        async: true,
        success:function(data){
            alert("Deleted Successfully");
            getAllEmployees();
        },
        error:function(xhr,exception){
            alert("Something went wrong");
        }
    });
}


function getAllEmployees() {
    $.ajax({
        url: 'http://localhost:8081/api/v1/employee/getAllEmployees',
        method: 'GET',
        contentType: 'application/json',
        async: true,
        success: function(data) {
            if (data && data.content && data.content.length > 0) {
                $('#empTable').empty();
                for (let emp of data.content) {
                    let empID = emp.empid;
                    let name = emp.empname;
                    let address = emp.empaddress;
                    let number = emp.empMNumber;

                    var row = `<tr><td>${empID}</td><td>${name}</td><td>${address}</td><td>${number}</td></tr>`;
                    $('#empTable').append(row);
                }
            }
        },
        error: function(xhr, exception) {
            alert("Something went wrong");
        }
    });
}

$(document).ready(function () {
    $(document).on('click','#empTable tr', function () {
        var col0 = $(this).find('td:eq(0)').text();
        var col1 = $(this).find('td:eq(1)').text();
        var col2 = $(this).find('td:eq(2)').text();
        var col3 = $(this).find('td:eq(3)').text();

        $('#exampleFormControlInput1').val(col0);
        $('#exampleFormControlInput2').val(col1);
        $('#exampleFormControlInput3').val(col2);
        $('#exampleFormControlInput4').val(col3);

    })
})

