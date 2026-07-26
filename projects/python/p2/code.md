# Common Utility Functions

## Format Number

``` python 
def format_number(value):
    if value >= 1000000000:
        return f'{(value/1000000000):.2f}B'
    elif value >= 1000000:
        return f'{(value/1000000):.2f}M'
    elif value >= 1000:
        return f'{(value/1000):.2f}K'
    else:
        return f'{value:.2f}'
```

## Filter Function
```python
def year_filter(df: pd.DataFrame,column_name:str, filter):
    if filter == 'All':
        return df
    else:
        return df[df[column_name] == filter]

def gender_filter(df: pd.DataFrame, filter):
    if filter == 'All':
        return df
    else:
        return df[df['gender'] == filter]

def marital_status_filter(df: pd.DataFrame, filter):
    if filter == 'All':
        return df
    else:
        return df[df['marital_status'] == filter]

def age_group_filter(df: pd.DataFrame, filter):
    if filter == 'All':
        return df
    else:
        return df[df['age_group'] == filter]

```
## Metric

``` python 
def metric(kpi_name: 'str', value:int | float, data: pd.DataFrame, x: str, y: str, key: int|str , tipname1:str, tipname2:str, tipname3:str):

    st.metric(kpi_name, format_number(value))

    fig = px.bar(x=data[x], y=data[y], height=140, color_discrete_sequence=[color]) 

    fig.update_layout(
        xaxis = dict(title = None, showticklabels = False, showgrid = False,linewidth=0),
        yaxis = dict(title = None, showticklabels = False, showgrid = False))

    fig.update_layout(plot_bgcolor = "rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)", margin = dict(l=20, r=20, t=0, b=20))   

    fig.update_layout(
        hoverlabel=dict(
            bgcolor="rgba(40, 25, 61, 0.6)",
            bordercolor="rgba(255,255,255,0.15)",
            font_size=14,
            font_color="white"
        )
    )

    fig.update_traces(
        customdata = data,  
        hovertemplate =   
        f"{tipname1}: <b>%{{x}}</b><br>"
        f"{tipname2}: <b>%{{customdata[1]:.1f}}</b><br>"
        f"{tipname3}: <b>%{{customdata[2]:.1f}}%</b><br>"
    )

    st.plotly_chart(fig, config={"displayModeBar": False}, key=key)
```

## Bar Chart


``` python
def bar_chart(key:int | str, data:pd.DataFrame, x:str, y:str, xtitle=None, ytitle=None, height=None, width=None,):
    fig = px.bar(
        x=data[x],
        y=data[y],
        width=width,
        height=height,
        color_discrete_sequence=[color]
    )

    fig.update_layout(
        xaxis = dict(
            title=xtitle, 
            title_font=dict(color=text_color, size=18), 
            tickfont = dict(color = text_color, size = 15), showgrid = False, tickangle = 90),
        yaxis = dict(
            title=ytitle, 
            title_font=dict(color=text_color, size=18), 
            tickfont = dict(color = text_color, size = 15), showgrid = False))
    
    fig.update_traces(
        hovertemplate =   
        f"{ytitle}: <b>%{{y:.1f}}</b><br>"
    )

    fig.update_layout(
        hoverlabel=dict(
            bgcolor="rgba(40, 25, 61, 0.6)",
            bordercolor="rgba(255,255,255,0.15)",
            font_size=14,
            font_color="white"
        )
    )

    fig.update_layout(
        plot_bgcolor = "rgba(0,0,0,0)",
        paper_bgcolor='rgba(0,0,0,0)',
        margin = dict(l=10, r=10, t=10, b=10)
        )
    
    st.plotly_chart(fig, config={"displayModeBar": False}, key=key)
```

## Pie Chart

``` python 
def pie_chart(key:int|str, data:pd.DataFrame, names:str, values:str, hole:float|int, tipname:str, height:int, width:int):
    fig = px.pie(
        names=data[names],
        values=data[values],
        hole=hole,
        color_discrete_sequence=colors,
        height=height,
        width=width
    )

    fig.update_traces(
        textinfo='none',
        customdata = data,       
        hovertemplate =   
        f"{tipname}: <b>%{{customdata[0][1]}}</b><br>"
        f"Percentage: <b>%{{customdata[0][2]:.1f}}</b><br>"
    )
    fig.update_layout(legend=dict(
        orientation="v",
        xanchor="left",
        yanchor="top",
        font=dict(color=text_color)
    ))

    fig.update_layout(
        hoverlabel=dict(
            bgcolor="rgba(40, 25, 61, 0.6)",
            bordercolor="rgba(255,255,255,0.15)",
            font_size=14,
            font_color="white"
        )
    )

    fig.update_layout(
        plot_bgcolor = "rgba(0,0,0,0)",
        paper_bgcolor='rgba(0,0,0,0)', 
        margin = dict(l=10, r=10, t=10, b=10)
    )
    
    st.plotly_chart(fig, config={"displayModeBar": False}, key=key)

```