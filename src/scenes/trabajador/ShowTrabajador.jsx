/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
import Header from "../../components/Header.jsx";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getApi } from "../../tools/mantenimiento-api.js";
import {
  AdminPanelSettingsOutlined,
  EditOutlined,
  PersonOutlineOutlined,
  SupervisorAccountOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const WorkerScene = ({ payload, setOpen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState({});
  const [rows, setRows] = useState([]);

  const timeWait = 1250;

  const navigate = useNavigate();

  const getRowId = (row) => {
    return row.id_trabajadores;
  };

  useEffect(() => {
    setOpen(false);
    setData(payload);
  }, [payload]);

  useEffect(() => {
    const getData = async () => {
      setOpen(true);

      await new Promise((resolve) => setTimeout(resolve, timeWait));
      const rs = await getApi("/m_trabajadores/all/", data.token);
      setRows(rs);
      await new Promise((resolve) => setTimeout(resolve, timeWait));
      setOpen(false);
    };
    getData();
  }, [data]);

  const columns = [
    { field: "id_trabajadores", headerName: "ID", aling: "center" },
    { field: "dni", headerName: "D.N.I." },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "cargo",
      headerName: "Cargo",
      flex: 1,
    },
    {
      field: "correo",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "nivel",
      headerName: "Nivel de acceso",
      flex: 1,
      renderCell: (params) => {
        const nivel = params.value;
        let title = "";
        if (nivel === 1) {
          title = "Admin";
        } else if (nivel === 2) {
          title = "Supervisor";
        } else {
          title = "Ejecutor";
        }
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              nivel === 1
                ? colors.greenAccent[400]
                : nivel === 2
                ? colors.greenAccent[600]
                : colors.greenAccent[800]
            }
            borderRadius="4px"
          >
            {nivel === 1 && <AdminPanelSettingsOutlined />}
            {nivel === 2 && <SupervisorAccountOutlined />}
            {nivel === 3 && <PersonOutlineOutlined />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {title}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Actualizar",
      flex: 1,
      width: 150,
      renderCell: (params) => {
        const permiso = payload.nivel != 1 ? true : false;
        return (
          <Button
            type="button"
            variant="contained"
            disabled={permiso}
            size="small"
            color="warning"
            onClick={() => {
              navigate("/app/worker/update/" + params.id);
            }}
          >
            <EditOutlined />
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Lista de Trabajadores"
        subtitle="Tabla con la lista de trabajadores registrados"
      />
      <Box
        m="10px 0 0 0"
        height="100%"
        p="15px"
        borderRadius={3}
        bgcolor={colors.primary[900]}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={getRowId}
          density="compact"
        />
      </Box>
    </Box>
  );
};

export default WorkerScene;
