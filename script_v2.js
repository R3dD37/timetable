//#region Global
var SelectedEventTable, SelectedEvent, EventTables = [];
const CurrentDate = new Date();

function ClearInputs()
{
    document.getElementById('title').value = '';
    document.getElementById('desc').value = '';
}

function DisableDeleteFun()
{
    SelectedEvent = undefined;
    document.getElementById('selected_event').innerHTML = "NOWE";
    document.getElementById('delete_button').disabled = true;
}
//#endregion

//#region EventTable
class EventTable
{
    constructor(date)
    {
        this.date = date;
        this.events = [];
    }

    AddEvent(title, description)
    {
        this.events.push(new Event(title, description));
    }

    EditEvent(element_index, title, description)
    {
        this.events[element_index].title = title;
        this.events[element_index].description = description;
    }

    DeleteEvent(element_index)
    {
        this.events.splice(element_index, 1);
    }

    ShowEvents()
    {
        document.getElementById('events').innerHTML = BuildEvents(this.events).join('');
    }
}

function SelectDate()
{
    DisableDeleteFun();

    let selected_date = document.getElementById('selected_date').value;
    for (let i = 0; i < EventTables.length; i++) {
        const element = EventTables[i];
        if (element.date == selected_date)
        {
            SelectedEventTable = element;
            SelectedEventTable.ShowEvents();
            return;
        }
    }
    EventTables.push(new EventTable(selected_date));
    SelectedEventTable = EventTables[EventTables.length - 1];
    SelectedEventTable.ShowEvents();
}
//#endregion

//#region Events
class Event
{
    constructor(title, description)
    {
        this.title = title;
        this.description = description;
    }
}

const BuildEvents = (events) => {
    let tab = [];
    if (events.length != 0)
    {
        for (let i = 0; i < events.length; i++) {
            const element = events[i];
            tab.push(`<tr><td><button onclick='SelectEvent(${i})'>${i + 1}. ${element.title}</button></td></tr>`);
        }
    }
    return tab;
}

function AddEvent()
{
    if (SelectedEventTable != undefined)
    {
        if (SelectedEvent != undefined)
        {
            let title = document.getElementById('title').value;
            let desc = document.getElementById('desc').value;
            SelectedEventTable.EditEvent(document.getElementById('selected_event').innerHTML, title, desc);
            DisableDeleteFun();
            SelectedEventTable.ShowEvents();
        }
        else
        {
            let title = document.getElementById('title').value;
            let desc = document.getElementById('desc').value;
            SelectedEventTable.AddEvent(title, desc);
            SelectedEventTable.ShowEvents();
        }

        ClearInputs();
    }
}

function DeleteEvent()
{
    if (SelectedEventTable != undefined && SelectedEvent != undefined)
    {
        console.log("XD");
        SelectedEventTable.DeleteEvent();
        SelectedEventTable.ShowEvents(document.getElementById('selected_event').innerHTML);
        DisableDeleteFun();
    }
}

function SelectEvent(value)
{
    if (value == "new")
    {
        DisableDeleteFun();
    }
    else
    {
        document.getElementById('selected_event').innerHTML = value;
        SelectedEvent = SelectedEventTable.events[value];
        document.getElementById('delete_button').disabled = false;
        document.getElementById('title').value = SelectedEvent.title;
        document.getElementById('desc').value = SelectedEvent.description;
    }
}
//#endregion