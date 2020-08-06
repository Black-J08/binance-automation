getBody();

const refreshButton = document.getElementById('refreshButton');
refreshButton.onclick = getBody;

const createPair = document.getElementById('createPair');
const createAmount = document.getElementById('createAmount');
const createTimeFrame = document.getElementById('createTimeFrame');
const createButton = document.getElementById('createButton');

createButton.onclick = function () {

    $.ajax({
        url: '/bot',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            pair: createPair.value,
            amount: createAmount.value,
            timeFrame: createTimeFrame.value,
        }),
        success: function (res) {
            console.log(res);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function getBody() {

    $.ajax({
        url: '/bot',
        contentType: 'application/json',
        success: function (res) {
            const tbody = document.getElementById('tbody');
            tbody.innerHTML = ' ';
            res.botArray.forEach(bot => {

                switch (bot.status) {
                    case 0:
                        var statusText = document.createTextNode("Inactive");
                        break;
                    case 1:
                        var statusText = document.createTextNode("Active");
                        break;
                    default:
                        var statusText = document.createTextNode(" -- ");
                        break;
                }
                var idText = document.createTextNode(bot.id);
                var pairText = document.createTextNode(bot.pair);
                var amountText = document.createTextNode(bot.amount);
                var timeFrameText = document.createTextNode(bot.timeFrame);
                var currentPriceText = document.createTextNode(bot.currentPrice)
                var profitLossText = document.createTextNode(bot.profitLoss + "%")

                var idNode = document.createElement('td');
                var pairNode = document.createElement('td');
                var statusNode = document.createElement('td');
                var amountNode = document.createElement('td');
                var timeFrameNode = document.createElement('td');
                var currentPriceNode = document.createElement('td')
                var profitLossNode = document.createElement('td')
                var buttonsNode = document.createElement('td');

                idNode.appendChild(idText);
                pairNode.appendChild(pairText);
                statusNode.appendChild(statusText);
                amountNode.appendChild(amountText);
                timeFrameNode.appendChild(timeFrameText);
                currentPriceNode.appendChild(currentPriceText);
                profitLossNode.appendChild(profitLossText);

                var buttonDiv = document.createElement('div');

                var activateButtonText = document.createTextNode('Activate');
                var deactivateButtonText = document.createTextNode('Deactivate');
                var buyNowButtonText = document.createTextNode('Buy Now');
                var sellNowButtonText = document.createTextNode('Sell Now');
                var editButtonText = document.createTextNode('Edit');
                var deleteButtonText = document.createTextNode('Delete');

                var activateButtonNode = document.createElement('button');
                var deactivateButtonNode = document.createElement('button');
                var buyNowButtonNode = document.createElement('button');
                var sellNowButtonNode = document.createElement('button');
                var editButtonNode = document.createElement('button');
                var deleteButtonNode = document.createElement('button');

                activateButtonNode.appendChild(activateButtonText);
                deactivateButtonNode.appendChild(deactivateButtonText);
                buyNowButtonNode.appendChild(buyNowButtonText);
                sellNowButtonNode.appendChild(sellNowButtonText);
                editButtonNode.appendChild(editButtonText);
                deleteButtonNode.appendChild(deleteButtonText);

                buttonDiv.appendChild(activateButtonNode);
                buttonDiv.appendChild(deactivateButtonNode);
                buttonDiv.appendChild(buyNowButtonNode);
                buttonDiv.appendChild(sellNowButtonNode);
                buttonDiv.appendChild(editButtonNode);
                buttonDiv.appendChild(deleteButtonNode);

                buttonsNode.appendChild(buttonDiv);


                var columnNode = document.createElement('tr');
                columnNode.style.height = '200px';

                columnNode.appendChild(idNode);
                columnNode.appendChild(pairNode);
                columnNode.appendChild(statusNode);
                columnNode.appendChild(amountNode);
                columnNode.appendChild(timeFrameNode);
                columnNode.appendChild(currentPriceNode);
                columnNode.appendChild(profitLossNode);
                columnNode.appendChild(buttonsNode);

                tbody.appendChild(columnNode);

                activateButtonNode.onclick = function () {
                    $.ajax({
                        url: '/bot',
                        method: 'PUT',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            id: bot.id,
                            action: 1,
                        }),
                        success: function (res) {
                            console.log(res);
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });
                }

                deactivateButtonNode.onclick = function () {
                    $.ajax({
                        url: '/bot',
                        method: 'PUT',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            id: bot.id,
                            action: 2,
                        }),
                        success: function (res) {
                            console.log(res);
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });
                }

                buyNowButtonNode.onclick = function () {
                    $.ajax({
                        url: '/bot',
                        method: 'PUT',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            id: bot.id,
                            action: 3,
                        }),
                        success: function (res) {
                            console.log(res);
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });
                }

                sellNowButtonNode.onclick = function () {
                    $.ajax({
                        url: '/bot',
                        method: 'PUT',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            id: bot.id,
                            action: 4,
                        }),
                        success: function (res) {
                            console.log(res);
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });
                }

                editButtonNode.onclick = function () {

                    var editAmountNode = document.createElement('input');
                    var editTimeFrameNode = document.createElement('select');
                    var editDoneButtonNode = document.createElement('button');

                    editAmountNode.type = 'text';
                    editAmountNode.placeholder = 'Amount';

                    editTimeFrameNode = createTimeFrame.cloneNode(true);
                    editTimeFrameNode.style.float = 'none';
                    editTimeFrameNode.style.width = 'auto';

                    editDoneButtonNode.innerText = 'Done';
                    editDoneButtonNode.style.width = '100%';

                    amountNode.replaceChild(editAmountNode, amountText);
                    timeFrameNode.replaceChild(editTimeFrameNode, timeFrameText);
                    buttonsNode.replaceChild(editDoneButtonNode, buttonDiv);

                    editDoneButtonNode.onclick = function () {
                        $.ajax({
                            url: '/bot',
                            method: 'PUT',
                            dataType: 'json',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                id: bot.id,
                                action: 5,
                                amount: editAmountNode.value,
                                timeFrame: editTimeFrameNode.value,
                            }),
                            success: function (res) {
                                console.log(res);
                            },
                            error: function (e) {
                                console.log(e);
                            }
                        });
                    }

                }

                // deleteButtonNode.onclick = function () {
                //     $.ajax({
                //         url: '/bot',
                //         method: 'PUT',
                //         dataType: 'json',
                //         contentType: 'application/json',
                //         data: JSON.stringify({
                //             id: bot.id,
                //             action: 6,
                //         }),
                //         success: function (res) {
                //             console.log(res);
                //         },
                //         error: function (e) {
                //             console.log(e);
                //         }
                //     });
                // }

            });
        }
    })
}