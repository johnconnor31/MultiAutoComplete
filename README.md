# MultiAutoComplete

@mui/material/Autocomplete already offers good functionality when you want an autocomplete select component with multiselect option.

I have extended its funtionality to support an Autocomplete of Autocompletes.

![alt text](https://github.com/johnconnor31/AutoAutoComplete/blob/main/sampleImage.jpg?raw=true)

This will be helpful in a Jira filter type of situation where:

A user may need to select few filters like:

1. Assignee
2. Created Date
3. Updated Date
4. Reported by etc. 

In each of the above filters, you can pick the value of filter by selecting  from a list of subOptions.

# API Options

**1. allOptions**

The main options data to pick filters from.
Example format will look like below:
```
[
{ 
"name":"Assignee", 
  "values": [
        "Elon Musk",
        "Jeff Bezos"
        ]
 },
{ 
"name": "reporter", 
  "values": [
    "Elon Musk",
    "Jeff Bezos"
    ]
},
{ "name": "status",
    "values": [
    "Open",
    "In Progress",
    "In Code Review",
    "Resolved",
    "Verified",
    "Closed"
    ]
},
{ "name": "Updated Date", 
  "type": "Date"
},
{ "name": "Created Date",
  "type": "Date"
}
];
```
**2. subOptions**

Currently selected list of sub options. Defaults to []

**3. onChangeSubOptions**

Method to be called to set the list of subOptions.

You can create a state Variable to handle the sub options selection.

**Example:** 
```
const [subOptions, setSubOptions] = React.useState([]);
```

PS: Currently there is only support for two types of filters
1. TextField
2. Date Picker
