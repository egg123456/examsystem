$(() => {
    // init
    var arr = [],
        tbody = $('tbody'),
        text = $("#text"),
        column = $('#column'),
        c = null;
    $.ajax({
        url: '/sss/init',
        type: 'post',
        datatype: 'json',
        success: (d) => {
            d.shift();
            d.shift();
            d.shift();
            arr = d;
            var thead = $('thead tr');
            for (var i = 0; i < arr.length; i++) {
                thead.append(`<th>${arr[i].column_name}</th>`);
            }
        },
        error: (err) => {
            console.log(err);
        }
    })

    $("#queryAll,#insert,#order,#filter").on("click", function() {
        var type = this.id,
            url = '/sss/' + type;

        switch (type) {
            case 'queryAll':
                queryAll(url, type);
                break;
            case 'insert':
                insert(arr, tbody);
                break;
            case 'order':
                column.removeClass("hidden").siblings().addClass('hidden');
                break;
            case 'filter':
                text.removeClass("hidden").siblings().addClass('hidden');
                break;
        }
    })

    column.on('blur', function() {
        if (tbody.children().length === 0) {
            alert('没有数据，无法排序');
        } else {
            var sreg = /\s+/,
                preg = /^\s+/,
                areg = /\s+$/;
            var inp = $(this).val();
            inp = inp.replace(preg, '');
            inp = inp.replace(areg, '');
            inp = inp.split(sreg);
            var index;
            for (var k = 0; k < arr.length; k++) {
                if (inp[0] == arr[k].column_name) {
                    index = k;
                    break;
                }
            }
            if (k == arr.length) return;
            var trs = tbody.children();
            trs = Array.prototype.slice.call(trs);
            var up = 1,
                down = -1;
            if (inp[1] == 'down') {
                up = -1;
                down = 1;
            }
            if (arr[index].data_type == "int") {
                trs.sort(function(a, b) {
                    console.log(+$(a).children().eq(index).html());
                    if (+$(a).children().eq(index).html() > +$(b).children().eq(index).html()) {
                        return up;
                    } else if (+$(a).children().eq(index).html() == +$(b).children().eq(index).html()) {
                        return 0;
                    } else {
                        return down;
                    }
                });
            } else {
                trs.sort(function(a, b) {
                    console.log($(a).children().eq(index).html());
                    if ($(a).children().eq(index).html() > $(b).children().eq(index).html()) {
                        return up;
                    } else if ($(a).children().eq(index).html() == $(b).children().eq(index).html()) {
                        return 0;
                    } else {
                        return down;
                    }
                });
            }

            tbody.empty();
            for (var j = 0; j < trs.length; j++) {
                tbody.append(trs[j]);
            }
        }
    })

    //输入搜索条件事件 
    text.on('blur', function() {
        var inp = $(this).val();
        if (!inp) return;

        var data = {
            condition: inp
        };
        query(data);
    })

    function query(data) {
        var url = '/sss/query';
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            datatype: "json",
            success: (d) => {
                tbody.empty();
                content(d);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    function insert(arr, tbody) {
        var tr = tbody.append('<tr></tr>').children().last();
        for (var i = 0; i < arr.length; i++) {
            tr.append(`<td></td>`)
        }
    }

    function queryAll(url, type) {
        $.ajax({
            url: url,
            type: 'post',
            datatype: 'json',
            success: (data) => {
                c = data;
                tbody.empty();
                // tbody contents
                content(data)
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    function content(data) {
        for (var j = 0; j < data.length; j++) {
            var tr = tbody.append('<tr></tr>').children().last();
            for (var key in data[j]) {
                if (data[j].hasOwnProperty(key)) {
                    var element = data[j][key];
                    tr.append(`<td>${element}</td>`)
                }
            }
        }
    }

    tbody.on('dblclick', 'td', function() {
        if ($(this).children().length) return;
        val = $(this).html();
        // $(this).html('');
        $(this).empty();
        $(this).append(`<input id="val" type="text" value=${val}>`);
    });
    tbody.on('blur', '#val', function() {
        if ($(this).val() == val) {
            $(this).parent().empty().html(val);
        } else {
            val = $(this).val();
            var _this = $(this).parent().html(val);
            var i = _this.index();
            var key = arr[i].column_name;
            console.log(i, key);

            var id = _this.parent().children().first().html();
            console.log(id);
            // var data = {key:val} //{key:var的值}
            var data = { id: id };
            data[key] = val;
            console.log(data);
            update(data);
        }
    });

    function update(data) {
        var url = '/sss/update';
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            datatype: 'json',
            success: (d) => {
                console.log(d);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    tbody.on('mousedown', 'tr', function(e) {
        console.log(e.which);
        if (e.which == 3) {
            $(this).addClass('bg-danger').siblings().removeClass('bg-danger');
            if (confirm('确认删除此条信息吗？')) {
                var data = {};
                data.id = $(this).children().first().html();
                $(this).remove();
                console.log(data.id);
                $.ajax({
                    url: '/sss/delete',
                    type: 'post',
                    data: data,
                    datatype: 'json',
                    success: (d) => {
                        console.log(d);
                        alert('已删除')
                    },
                    error: (err) => {
                        console.log(err);
                    }
                })
            }
        }
    })
})