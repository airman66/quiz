"use client";

import "./index.css";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useState} from "react";

const RemoveTable = () => {
    const [open, setOpen] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [selected, setSelected] = useState([]);

    const columns = [
        { field: 'id', headerName: 'id', width: 150, disableColumnMenu: true, filterable: false, sortable: false },
        { field: 'name', headerName: 'Тема', width: 200, disableColumnMenu: true, filterable: false, sortable: false },
        { field: 'subject', headerName: 'Предмет', width: 200, disableColumnMenu: true, filterable: false, sortable: false },
        {
            field: 'class',
            headerName: 'Класс',
            type: 'number',
            width: 100,
            disableColumnMenu: true,
            filterable: false,
        },
        {
            field: 'description',
            headerName: 'Описание',
            width: 200,
            disableColumnMenu: true,
            filterable: false,
            sortable: false
        }
    ];


    const removeSelected = () => {
        const newSelected = JSON.parse(JSON.stringify(selected));
        const newQuizzes = JSON.parse(JSON.stringify(quizzes)).filter(quiz => {
            let isRemove = false;
            newSelected.forEach(id => {
                if (id === quiz.id) {
                    isRemove = true;
                }
            });
            return !isRemove;
        });
        localStorage.setItem("quizzes", JSON.stringify(newQuizzes));
        setQuizzes(newQuizzes);
    };

    const Yes = () => {
        removeSelected();
        setOpen(false);
    };
    const No = () => {
        setOpen(false);
    };

    useEffect(() => {
        const quizzesFromLocalStorage = JSON.parse(localStorage.getItem("quizzes")) || [];
        setQuizzes(quizzesFromLocalStorage);
    }, []);

    return (
        <div className="table-wrapper">
            <Dialog
                open={open}
                onClose={No}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Удалить"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы точно хотите удалить выбранные викторины?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={No}>Нет</Button>
                    <Button onClick={Yes}>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
            <Typography variant="h4" color="inherit" component="h1">
                Удалить
            </Typography>
            <div style={{marginTop: 30, height: 400, width: '100%' }}>
                <DataGrid
                    onRowSelectionModelChange={e => setSelected(e)}
                    rows={quizzes}
                    columns={columns}
                    checkboxSelection
                />
            </div>
            <Button onClick={() => setOpen(true)} disabled={selected.length < 1} style={{marginTop: 15}} variant="contained" color="error" size="large">
                Удалить
            </Button>
        </div>
    );
};

export default RemoveTable;