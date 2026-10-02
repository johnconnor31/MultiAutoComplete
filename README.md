# MultiAutoComplete

A powerful React component that extends Material-UI's Autocomplete to support **nested multi-level selectors**. Create complex filter hierarchies where you can have selectors inside the main selector.

## Overview

MultiAutoComplete enables building advanced filtering interfaces similar to Jira, where users can:
- Select multiple filter types (e.g., Assignee, Status, Date)
- For each filter, choose from a list of sub-options
- Support both text and date-based filters

## Features

✨ **Nested Selectors** - Add autocomplete fields within each selected filter

🎯 **Multi-Select Support** - Select multiple filters simultaneously

📅 **Date Pickers** - Built-in support for date range and single date selections

🎨 **Material-UI Integration** - Built on Material-UI v6 for consistent styling

⚙️ **Flexible Configuration** - Easy API for defining filter options and sub-options

## Use Cases

- **Jira-like Filtering** - Filter by Assignee, Status, Created Date, Updated Date, etc.
- **Advanced Search** - Multi-criteria search with nested options
- **Dynamic Filters** - Configure filter hierarchies on the fly

## Installation

```bash
npm install multiautocomplete
```

## Basic Usage

```jsx
import MultiAutoComplete from 'multiautocomplete';

const allOptions = [
  { 
    name: "Assignee", 
    values: ["Elon Musk", "Jeff Bezos"]
  },
  { 
    name: "Status", 
    values: ["Open", "In Progress", "Closed"]
  },
  { 
    name: "Created Date", 
    type: "Date"
  }
];

function App() {
  const [subOptions, setSubOptions] = React.useState([]);

  return (
    <MultiAutoComplete
      allOptions={allOptions}
      subOptions={subOptions}
      onChangeSubOptions={setSubOptions}
    />
  );
}
```

## API Options

### 1. `allOptions` (Required)

The main filter options data. Each option can have a list of sub-values or be a date filter.

**Format:**
```javascript
[
  { 
    name: "Assignee", 
    values: [
      "Elon Musk",
      "Jeff Bezos"
    ]
  },
  { 
    name: "Reporter", 
    values: [
      "Elon Musk",
      "Jeff Bezos"
    ]
  },
  { 
    name: "Status",
    values: [
      "Open",
      "In Progress",
      "In Code Review",
      "Resolved",
      "Verified",
      "Closed"
    ]
  },
  { 
    name: "Updated Date", 
    type: "Date"
  },
  { 
    name: "Created Date",
    type: "Date"
  }
]
```

### 2. `subOptions` (Optional)

Array of currently selected filters and their values. Defaults to `[]`.

### 3. `onChangeSubOptions` (Required)

Callback function to update the selected sub-options when the user makes a selection.

**Example:**
```jsx
const [subOptions, setSubOptions] = React.useState([]);

<MultiAutoComplete
  allOptions={allOptions}
  subOptions={subOptions}
  onChangeSubOptions={setSubOptions}
/>
```

## Supported Filter Types

- **TextField** - Standard text input with autocomplete suggestions
- **Date Picker** - Material-UI date picker for date selection

## Live Demo

Check out the [live demo](https://multi-auto-complete.vercel.app/) to see MultiAutoComplete in action.

## License

ISC
