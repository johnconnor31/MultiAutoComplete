import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns }from '@mui/x-date-pickers/AdapterDateFns';
import { Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root: {
        marginTop: '2rem'
    },
    innerTextField: {
        minWidth: '10rem'
    },
    datePicker: {
        width: '10rem'
    },
    pickerIcon: {
        marginLeft: '1px'
    }
}));

function SearchWidget(props) {
    const { subOptions = [], changeSubOptions = () => { }, allOptions = [], customStyles = {} } = props;
    const styles = useStyles();
    const setSubOptions = values => changeSubOptions([...values]);

    const selectedOptions = subOptions.map(subOpt => allOptions.find(opt => opt.name === subOpt.name));

    function changeSelectedOptions(e, values, reason) {
        if(reason === 'clear') {
            setSubOptions([]);
        } else {
            const currSubOptions = [...subOptions];
            if (currSubOptions.length > values.length) {
                const removedOption = currSubOptions.findIndex(subOpt => !values.find(val => val.name === subOpt.name));
                currSubOptions.splice(removedOption, 1);
            } else {
                const addedOption = values.find(val => !currSubOptions.find(subOpt => val.name === subOpt.name));
                currSubOptions.push({ name: addedOption.name, values: addedOption.type !== 'Date' ? [] : new Date() });
            }
            setSubOptions(currSubOptions);
        }
    }

    return (
        <Autocomplete
            className={customStyles.root || styles.root}
            id='search-widget'
            multiple
            filterSelectedOptions
            options={allOptions}
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
    const styles = useStyles();
    const textRef = React.useRef();

    const { selectedOptions, subOptions, setSubOptions, customStyles, children, className } = props;
    const selectedOption = selectedOptions[props['data-tag-index']] || {};
    const { type, name, values } = selectedOption;

    function onTextClick(e) {
        e.stopPropagation();
        e.preventDefault();
        textRef.current.focus();
    }

    const currentOptionId = subOptions.findIndex(val => val.name === name);
    const changeValues = name => (event, values) => {
        if (currentOptionId !== -1) {
            subOptions.splice(currentOptionId, 1, {
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

    const InputField = !type ? <Autocomplete
        multiple
        filterSelectedOptions
        options={values}
        onChange={changeValues(selectedOption.name)}
        value={subOptions[currentOptionId].values}
        renderInput={props => <TextField
            id='innerSearch'
            {...props}
            ref={textRef}
            variant='standard'
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
        : <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                variant='inline'
                autoOk
                format="MM/dd/yyyy"
                animateYearScrolling
                value={subOptions[currentOptionId].values}
                onChange={changeValues(selectedOption.name)}
                InputAdornmentProps={{
                    position: 'start'
                }}
                KeyboardButtonProps={{
                    color: 'primary'
                }}
                renderInput={props => <TextField {...props} 
                classes={{ root: customStyles.datePicker || styles.datePicker }}
                variant='standard'
                InputProps={{
                    ...props.InputProps,
                    disableUnderline: true,
                }} 
                />}
                OpenPickerButtonProps={{ style: { marginLeft: '1px' } }}
            />
        </LocalizationProvider>;

    const chipComponentWithTextBox = Object.assign([], [children[0][0], children[0][1], ':  ', InputField, props.children[0][2]]);

    return (
        <>
            <div className={className} key={selectedOption.name} onClick={onTextClick} onKeyDown={onTextClick}>
                {chipComponentWithTextBox}
            </div>
        </>
    );
}

export default SearchWidget;
