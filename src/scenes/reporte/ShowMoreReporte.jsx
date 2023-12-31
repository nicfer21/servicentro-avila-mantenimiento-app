/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { tokens } from "../../theme.js";
import Header from "../../components/Header.jsx";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getApi } from "../../tools/mantenimiento-api.js";

import LogoEmpresa from "../../LogoEmpresa.jpg";

import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  PDFViewer,
  View,
} from "@react-pdf/renderer";

import { useParams } from "react-router-dom";
import { getLocalDate, searchArray } from "../../tools/extra.js";

const ShowMoreReporte = ({ payload, setOpen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();

  const [data, setData] = useState({});

  const [dataReporte, setDataReporte] = useState(null);
  const [dataActividadOrden, setDataActividadOrden] = useState(null);

  const [change, setChange] = useState(false);

  const tipo = [
    {
      value: "1",
      label: "Mantenimiento correctivo",
    },
    {
      value: "2",
      label: "Mantenimiento preventivo con base en el tiempo",
    },
    {
      value: "3",
      label: "Mantenimiento preventivo con base en el uso",
    },
    {
      value: "4",
      label: "Mantenimiento predictivo",
    },
    {
      value: "5",
      label: "Mantenimiento de oportunidad",
    },
    {
      value: "6",
      label: "Detección de fallas",
    },
    {
      value: "7",
      label: "Modificación del diseño",
    },
    {
      value: "8",
      label: "Reparación General",
    },
    {
      value: "9",
      label: "Reemplazo",
    },
  ];

  const prioridad = [
    {
      value: "1",
      label: "Emergencia",
    },
    {
      value: "2",
      label: "Urgencia",
    },
    {
      value: "3",
      label: "Normal",
    },
    {
      value: "4",
      label: "Programada",
    },
  ];

  const timeWait = 1500;

  useEffect(() => {
    setOpen(false);
    setData(payload);
  }, [payload, setOpen]);

  useEffect(() => {
    const getData = async () => {
      setOpen(true);
      await new Promise((resolve) => setTimeout(resolve, timeWait));
      const rs = await getApi("/m_reportes/" + id, data.token);
      setDataReporte(rs.part1);
      setDataActividadOrden(rs.part2);
      setOpen(false);
    };
    getData();
  }, [data, setOpen, id]);

  return (
    <Box m="20px">
      <Header
        title={"Ver Reporte de Mantenimiento Nro: " + id}
        subtitle="Formato de Reporte de Mantenimiento"
        search
        titulo="Buscar por Numero de Reporte"
        placeholder="Buscar Reporte"
        link="/app/maintenance/report/show/"
        setChange={setChange}
      />
      <Box
        m="10px 0 0 0"
        height="70vh"
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
        <PDFViewer width="100%" height="100%" showToolbar>
          {dataReporte != null ? (
            <Document
              pdfVersion="1.7ext3"
              creator="Servicentro Avila"
              producer="Servicentro Avila"
              title={"Orden de Mantenimiento " + id}
            >
              <Page size={"A4"} style={styles.page} fixed>
                {/* Cabecera */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid black",
                    padding: 5,
                    marginBottom: 15,
                  }}
                >
                  <Image
                    src={LogoEmpresa}
                    style={{ width: 100, border: "3px solid black" }}
                  />
                  <Text style={styles.title}>
                    Reporte de Mantenimiento Nro {id}
                  </Text>
                  <Text style={{ fontSize: 9 }}>
                    Fecha : {new Date().toLocaleString()}
                  </Text>
                </View>

                {/* Informacion del Reporte  */}
                <View style={styles.section}>
                  <Text style={styles.subtitulo}>
                    1. Informacion de la Orden de Mantenimiento{" "}
                  </Text>
                  <Text style={styles.texto}>
                    1.1. Encargado de la Orden : {dataReporte.nombre}
                  </Text>
                  <Text style={styles.texto}>
                    1.2. Cargo del Encargado : {dataReporte.cargo}
                  </Text>
                  <Text style={styles.texto}>
                    1.3. Inicio Propuesto de Orden :{" "}
                    {getLocalDate(dataReporte.inicio_ordenes)}
                  </Text>
                  <Text style={styles.texto}>
                    1.4. Fin Propuesto de Orden :{" "}
                    {getLocalDate(dataReporte.fin_ordenes)}
                  </Text>
                  <Text style={styles.texto}>
                    1.5. Inicio Real del Reporte de Mantenimiento :{" "}
                    {getLocalDate(dataReporte.inicio_reportes)}
                  </Text>
                  <Text style={styles.texto}>
                    1.6. Fin Real del Reporte de Mantenimiento :{" "}
                    {getLocalDate(dataReporte.fin_reportes)}
                  </Text>
                  <Text style={styles.texto}>
                    1.7. Duracion de la Orden de Mantenimiento :{" "}
                    {dataReporte.duracion_reportes} minutos
                  </Text>
                  <Text style={styles.texto}>
                    1.8. Solicitud de Seguimiento :{" "}
                    {dataReporte.id_solicitudes != null
                      ? "Solicitud Nro " + dataReporte.id_solicitudes
                      : "No tiene Solicitud de Seguimiento"}
                  </Text>
                  <Text style={styles.texto}>
                    1.9. Orden de Mantenimiento : Orden Nro{" "}
                    {dataReporte.id_ordenes}
                  </Text>
                  <Text style={styles.texto}>
                    1.10. Descripcion de la Orden : {dataReporte.descripcion}
                  </Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.subtitulo}>
                    2. Actividades Realizadas
                  </Text>

                  {dataActividadOrden.map((row, iter) => {
                    const number = iter + 1;
                    return (
                      <View key={iter}>
                        {row.estado ? (
                          <>
                            <Text style={styles.subtitulo}>
                              2.{number}. {row.titulo}
                            </Text>
                            <Text style={styles.texto}>
                              {number}.1. Sistema y Ubicacion:{" "}
                              {row.sistemas_nombre}
                            </Text>
                            <Text style={styles.texto}>
                              {number}.2. Equipo/Unidad : {row.unidades_nombre}
                            </Text>
                            <Text style={styles.texto}>
                              {number}.3. Parte : {row.partes_nombre}
                            </Text>
                            <Text style={styles.texto}>
                              {number}.4. Codigo Parte : {row.codigo_c}
                            </Text>
                            <Text style={styles.texto}>
                              {number}.5. Duracion : {row.duracion} minutos
                            </Text>
                            <Text style={styles.texto}>
                              {number}.6. Tipo :{" "}
                              {row.tipo && searchArray(row.tipo, tipo)}
                            </Text>
                            <Text style={styles.texto}>
                              {number}.7. Prioridad :{" "}
                              {row.prioridad &&
                                searchArray(row.prioridad, prioridad)}
                            </Text>
                            <Text style={styles.texto}>
                              {number}.8. Procedimiento : {row.procedimiento}
                            </Text>
                            <Text style={styles.texto}>
                              {number}.9. Variables a tomar en cuenta:
                            </Text>
                            {row.variables != null
                              ? Object.entries(row.variables).map(
                                  (row, iter) => {
                                    return (
                                      <Text key={iter} style={styles.textoP}>
                                        {number}.6.{iter + 1}. {row[0]} :{" "}
                                        {row[1]}
                                      </Text>
                                    );
                                  }
                                )
                              : null}
                            <Text style={styles.texto}>
                              {number}.10. Variables anotadas:
                            </Text>
                            {row.info != null
                              ? Object.entries(row.info).map((row, iter) => {
                                  return (
                                    <Text key={iter} style={styles.textoP}>
                                      {number}.6.{iter + 1}. {row[0]} : {row[1]}
                                    </Text>
                                  );
                                })
                              : null}
                          </>
                        ) : (
                          <>
                            <Text style={styles.subtitulo}>
                              2.{number}. {row.titulo}
                            </Text>
                            <Text style={styles.texto}>
                              {number}.1. No se desarrollo esta actividad :
                              ID_ACT_ORD {row.id_act_ord}
                            </Text>
                          </>
                        )}
                      </View>
                    );
                  })}
                </View>

                <View style={styles.pageNumber}>
                  <Text
                    render={({ pageNumber, totalPages }) =>
                      `${pageNumber}/${totalPages}`
                    }
                  />
                </View>
              </Page>
            </Document>
          ) : null}
        </PDFViewer>
      </Box>
    </Box>
  );
};

export default ShowMoreReporte;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 25,
    display: "flex",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    marginTop: 10,
    padding: 5,
    border: "1px solid black",
  },
  subtitulo: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "justify",
    textTransform: "uppercase",
    lineHeight: 1.5,
    marginBottom: 5,
    marginTop: 5,
  },
  texto: {
    fontSize: 11,
    textAlign: "justify",
    lineHeight: 1.5,
    marginLeft: 10,
  },
  textoP: {
    fontSize: 9,
    textAlign: "justify",
    lineHeight: 1.5,
    marginLeft: 25,
  },
  imageContainer: {
    width: "250px",
    height: "250px",
    alignSelf: "center",
  },
  imagen: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
