import React from 'react';
import { TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '2rem'
    },
    innerTextField: {
        minWidth: '10rem'
    },
    datePicker: {
        width: '10rem'
    }
}));

export default function SearchWidget(props) {
    const { subOptions = [], changeSubOptions = () => { }, options = [], customStyles = {} } = props;
    const styles = useStyles();
    const setSubOptions = values => {
        const subOptCopy = Object.assign([], values);
        changeSubOptions(subOptCopy);
    }
    const selectedOptions = subOptions.map(subOpt => options.find(opt => opt.name === subOpt.name));

    function changeSelectedOptions(e, values, reason) {
        if(reason === 'clear') {
            setSubOptions([]);
        } else {
            const subOptsClone = Object.assign([], subOptions);
            if (subOptsClone.length > values.length) {
                const removedOption = subOptsClone.findIndex(subOpt => !values.find(val => val.name === subOpt.name));
                subOptsClone.splice(removedOption, 1);
            } else {
                const addedOption = values.find(val => !subOptsClone.find(subOpt => val.name === subOpt.name));
                subOptsClone.push({ name: addedOption.name, values: addedOption.type !== 'Date' ? [] : new Date() });
            }
            setSubOptions(subOptsClone);
        }
    }
    return (
        <Autocomplete
            className={customStyles.root || styles.root}
            id='search-widget'
            multiple
            filterSelectedOptions
            options={options}
            value={selectedOptions}
            onChange={changeSelectedOptions}
            getOptionLabel={o => o.name}
            renderInput={props => <TextField id='searchTextField' variant='outlined' {...props} />}
            ChipProps={{
                selectedOptions,
                subOptions,
                setSubOptions,
                variant: 'outlined',
                component: ChipWithTextBox,
                customStyles
            }} />
    );
}

function ChipWithTextBox(props) {
    const selectedOption = props.selectedOptions[props['data-tag-index']];
    const { subOptions, setSubOptions, customStyles } = props;
    const type = selectedOption.type;
    const name = selectedOption.name;
    const optionsList = selectedOption.opts;
    const styles = useStyles();
    const textRef = React.useRef();
    function onTextClick(e) {
        e.stopPropagation();
        e.preventDefault();
        textRef.current.focus();
    }
    const currentValID = subOptions.findIndex(val => val.name === name);
    const changeValues = name => (event, values) => {
        if (currentValID !== -1) {
            subOptions.splice(currentValID, 1, {
                name,
                values: typeof event.getMonth === 'function' ? event : values
            });
        } else {
            subOptions.push({
                name,
                values: typeof event.getMonth === 'function' ? event : values
            });
        }
        setSubOptions(subOptions);
    }
    const selectOptions = !type ? <Autocomplete
        key={`cardSearch${props.children[1]}`}
        id={`cardSearch${props.children[1]}`}
        multiple
        filterSelectedOptions
        options={optionsList}
        onChange={changeValues(selectedOption.name)}
        value={subOptions[currentValID].values}
        renderInput={props => <TextField
            id='innerSearch'
            {...props}
            ref={textRef}
            className={customStyles.innerTextField || styles.innerTextField}
            InputProps={{
                ...props.InputProps,
                disableUnderline: true
            }}
            fullWidth
            autoFocus
        />
        }
    />
        : <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                key={selectedOption.name}
                variant='inline'
                autoOk
                format="MM/dd/yyyy"
                animateYearScrolling
                value={subOptions[currentValID].values}
                onChange={changeValues(selectedOption.name)}
                InputAdornmentProps={{
                    position: 'start'
                }}
                InputProps={{
                    classes: { root: styles.datePicker },
                    disableUnderline: true
                }}
                KeyboardButtonProps={{
                    color: 'primary'
                }}
            />
        </MuiPickersUtilsProvider>;
    const chipComponentWithTextBox = Object.assign([], [props.children[0], props.children[1], ':', selectOptions, props.children[2]]);

    return (
        <>
            <div className={props.className} onClick={onTextClick} onKeyDown={onTextClick}>
                {chipComponentWithTextBox}
            </div>
        </>
    );
}
