# Common Data Cleaning Functions

### Clean Ids

``` python 
def clean_id(series:pd.Series, prefix:str, length:int) -> pd.Series:
        
    digits =    series.str.replace(r'\D', '', regex=True)

    digits =    digits.replace({'':np.nan}).astype('Int32')

    digits =    digits.replace({0:np.nan})

    formatted = (prefix + digits.astype(str).str.zfill(length))

    return formatted.where(digits.notnull())
```


### Clean Text

``` python 
def clean_text(series:pd.Series) -> pd.Series:

    text = series.astype(str).str.replace(r'[^A-Za-z\s]', '', regex=True)

    text =  text.str.strip()

    return text.replace({'':np.nan, 'nan':np.nan, 'None':np.nan})
```

### Clean Phone Number


``` python
def clean_phone_n(series:pd.Series) -> pd.Series:

    phone = series.astype(str).str.replace(r'\D','', regex= True)

    phone = phone.str.extract(r'(\d{10}$)')[0]

    phone = ('+91' + phone).where(phone.str.len() == 10)

    return phone
```
