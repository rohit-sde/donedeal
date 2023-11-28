document.addEventListener("DOMContentLoaded", function () {
    const submit_item = document.querySelector("#form");
    const items_list = document.querySelector("#items");
    const searchbox = document.querySelector("#searchbox");
    const search_clear_button = document.querySelector(".search_button");
    const search_icon = document.querySelector(".search_button i");
    // let clock = document.querySelector("#clock_digital");
    let day_and_date_long = document.querySelector(".day_and_date");
    let year_long = document.querySelector(".year");
    let time_long = document.querySelector(".full_time");

    function add_item(e) {
        e.preventDefault();
        let new_value = document.getElementById("new").value;
        let li = document.createElement("li");
        li.className = "list_items";
        li.appendChild(document.createTextNode(new_value));
        items_list.appendChild(li);

        let delete_button = document.createElement("button");
        delete_button.className = "delete";
        delete_button.appendChild(document.createTextNode("remove"));
        li.appendChild(delete_button);
        document.querySelector("#new").value = "";


        if (items_list.children.length == 0) {
            items_list.classList.add("bg");
        } else {
            items_list.classList.remove("bg");
        }
    }
    function remove_item(e) {
        if (e.target.classList.contains("delete")) {
            if (confirm("Are you sure you want to delete this?")) {
                let li = e.target.parentElement;
                items_list.removeChild(li);
            }
            if (items_list.children.length == 0) {
                items_list.classList.add("bg");
            }
            if (items_list.children.length != 0) {
                items_list.classList.remove("bg");
            }
        }
    }
    function filter_item(e) {

        if (searchbox.value == "") {
            search_icon.className = "fas fa-search";
            console.log(search_icon.className);
        } else {
            search_icon.className = "fas fa-times";
            console.log(search_icon.className);
        }

        let converted_to_lower = e.target.value.toLowerCase();
        const array_of_blocked_items = [];

        let items = document.querySelectorAll(".list_items");

        items.forEach((item) => {
            let item_name = item.firstChild.textContent;
            if (item_name.toLowerCase().indexOf(converted_to_lower) != (-1)) {
                item.classList.remove("none");
            } else {
                item.classList.add("none");
            }
            array_of_blocked_items.push(String(item.classList.contains("none")));
        });
        const contains_none = [];
        const not_contains_none = [];
        for (let k = 0; k < array_of_blocked_items.length; k++) {
            if (array_of_blocked_items[k] == "true") {
                contains_none.push(array_of_blocked_items[k]);
            }
            if (array_of_blocked_items[k] == "false") {
                not_contains_none.push(array_of_blocked_items[k]);
            }
        }

        if (contains_none.length == items.length) {
            items_list.classList.add("bg");
        } else {
            items_list.classList.remove("bg");
        }
    }
    function clear_search_input() {
        if (search_icon.className == "fas fa-times") {
            searchbox.value = "";
            search_icon.className = "fas fa-search";
            let items_2 = document.querySelectorAll(".list_items");
            items_2.forEach((item) => {
                item.classList.remove("none");
            });
        }
    }
    if (searchbox.value == "") {
        search_icon.className = "fas fa-search";
        console.log(search_icon.className);
    } else {
        search_icon.className = "fas fa-times";
        console.log(search_icon.className);
    }
    submit_item.onsubmit = add_item;
    items_list.onclick = remove_item;
    search_clear_button.onclick = clear_search_input;
    searchbox.addEventListener("keyup", filter_item);

    function timestamp(){}

    // clock
    function display_clock() {
        let time = new Date();

        let hour = time.getHours();
        let minutes = time.getMinutes();
        let sec = time.getSeconds();
        let anti_post_meridian = "am";

        if(hour > 12 && hour < 24){
            hour = hour - 12;
            anti_post_meridian = "pm";
        }
        if(hour == 0){
            hour = 12 - hour;
            anti_post_meridian = "am";
        }
        if(minutes < 10){
            minutes = `0${minutes}`;
        }
        if(sec < 10){
            sec = `0${sec}`;
        }

        let date = time.toLocaleString('default', { day: '2-digit' });
        let date_suffix = "th";
        if(date == 1){
            date_suffix = "st";
        }
        if(date == 2){
            date_suffix = "nd";
        }
        if(date == 3){
            date_suffix = "rd";
        }

        let day = time.toLocaleString('default', { weekday: 'long' });

        let month = time.toLocaleString('default', { month: 'long' });
        let year = time.toLocaleString('default', { year: '2-digit' });

        day_and_date_long.innerHTML = `${day}, ${date}<sup>${date_suffix}</sup>&nbsp${month}`;
        year_long.innerHTML = `&nbsp20${year}`;
        time_long.innerHTML = `${hour} : ${minutes} : <span style="font-size: 1rem">${sec}</span>&nbsp <span style="font-size: 1.3rem">${anti_post_meridian}</span>`;
    }
    setInterval(display_clock, 1000);
});
