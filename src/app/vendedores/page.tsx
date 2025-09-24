'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Vendedor {
  id_ven: number;
  nom_ven: string;
  ape_ven: string;
  cel_ven: string;
  distrito: { nombre: string } | null;
  especialidad: { nombre: string } | null;
}

export default function VendedoresPage() {
  const [vendedores, setVendedores] = useState<Vendedor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchVendedores() {
      try {
        const response = await fetch('/api/vendedores');
        const data = await response.json();
        setVendedores(data);
      } catch (error) {
        console.error("Error al cargar los vendedores:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVendedores();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este vendedor?')) {
      await fetch(`/api/vendedores/${id}`, { method: 'DELETE' });
      setVendedores(vendedores.filter(v => v.id_ven !== id));
    }
  }

  const filteredVendedores = vendedores.filter(vendedor =>
    vendedor.nom_ven.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendedor.ape_ven.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendedor.cel_ven.includes(searchTerm) ||
    (vendedor.distrito?.nombre || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para exportar a CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Nombre', 'Apellido', 'Celular', 'Distrito', 'Especialidad'];
    const csvContent = [
      headers.join(','),
      ...filteredVendedores.map(v => [
        v.id_ven,
        v.nom_ven,
        v.ape_ven,
        v.cel_ven,
        v.distrito?.nombre || 'Sin distrito',
        v.especialidad?.nombre || 'Sin especialidad'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `vendedores_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función para exportar a PDF (simulada)
  const exportToPDF = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Listado de Vendedores</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
                background: #0a0a0a;
                color: #ffffff;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
                background: linear-gradient(135deg, #ffd700, #daa520);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-size: 24px;
                font-weight: bold;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                background: #1f1f1f;
                border-radius: 12px;
                overflow: hidden;
              }
              th, td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #3a3a3a;
              }
              th {
                background: linear-gradient(135deg, #ffd700, #daa520);
                color: #0a0a0a;
                font-weight: bold;
              }
              tr:hover { background: #2a2a2a; }
              .text-white { color: #ffffff !important; }
              .fw-semibold { font-weight: 600 !important; }
            </style>
          </head>
          <body>
            <div class="header">Sistema de Vendedores - Listado de Vendedores</div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Celular</th>
                  <th>Distrito</th>
                  <th>Especialidad</th>
                </tr>
              </thead>
              <tbody>
                ${filteredVendedores.map(v => `
                  <tr>
                    <td class="text-white fw-semibold">${v.id_ven}</td>
                    <td class="text-white fw-semibold">${v.nom_ven}</td>
                    <td className="text-white fw-semibold">${v.ape_ven}</td>
                    <td class="text-white fw-semibold">${v.cel_ven}</td>
                    <td class="text-white fw-semibold">${v.distrito?.nombre || 'Sin distrito'}</td>
                    <td class="text-white fw-semibold">${v.especialidad?.nombre || 'Sin especialidad'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <h1 className="title-gold">Cargando vendedores...</h1>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header con título dorado */}
      <div className="card-elegant p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="title-gold mb-1">🏢 Gestión de Vendedores</h1>
            <p className="text-muted mb-0">Administra tu equipo de ventas de manera elegante</p>
          </div>
          <Link href="/vendedores/nuevo" className="btn btn-gold">
            ➕ Nuevo Vendedor
          </Link>
        </div>
      </div>

      {/* Barra de búsqueda y botones de exportar */}
      <div className="card-elegant p-4 mb-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                🔍
              </span>
              <input
                type="text"
                className="form-control search-elegant border-start-0"
                placeholder="Buscar vendedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 text-end">
            <button onClick={exportToCSV} className="btn btn-export me-2">
              📄 Exportar CSV
            </button>
            <button onClick={exportToPDF} className="btn btn-export">
              📋 Exportar PDF
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card-elegant p-3 text-center">
            <h2 className="text-warning mb-1">{vendedores.length}</h2>
            <p className="text-muted mb-0">Total Vendedores</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-elegant p-3 text-center">
            <h2 className="text-warning mb-1">
              {new Set(vendedores.map(v => v.distrito?.nombre).filter(Boolean)).size}
            </h2>
            <p className="text-muted mb-0">Distritos</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-elegant p-3 text-center">
            <h2 className="text-warning mb-1">
              {new Set(vendedores.map(v => v.especialidad?.nombre).filter(Boolean)).size}
            </h2>
            <p className="text-muted mb-0">Especialidades</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-elegant p-3 text-center">
            <h2 className="text-warning mb-1">
              {vendedores.filter(v => v.cel_ven).length}
            </h2>
            <p className="text-muted mb-0">Con Teléfono</p>
          </div>
        </div>
      </div>

      {/* Tabla elegante */}
      <div className="card-elegant p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="title-gold mb-0">📋 Listado de Vendedores</h2>
          <span className="badge bg-warning text-dark">
            Mostrando {filteredVendedores.length} de {vendedores.length}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-elegant">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Celular</th>
                <th>Distrito</th>
                <th>Especialidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendedores.length > 0 ? (
                filteredVendedores.map((vendedor) => (
                  <tr key={vendedor.id_ven}>
                    <td>
                      <span className="badge bg-dark text-warning">
                        #{vendedor.id_ven}
                      </span>
                    </td>
                    <td className="text-black">{vendedor.nom_ven}</td>
                    <td className="text-black">{vendedor.ape_ven}</td>
                    <td>
                      <span className="badge badge-celular">
                        📱 {vendedor.cel_ven}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-gold">
                        📍 {vendedor.distrito?.nombre || 'Sin distrito'}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-info text-dark">
                        ⭐ {vendedor.especialidad?.nombre || 'Sin especialidad'}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <Link
                          href={`/vendedores/editar/${vendedor.id_ven}`}
                          className="btn btn-outline-warning btn-sm me-1"
                        >
                          ✏️
                        </Link>
                        <button
                          onClick={() => handleDelete(vendedor.id_ven)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    <div className="text-visible">
                      {searchTerm ? 'No se encontraron vendedores que coincidan con la búsqueda.' : 'No hay vendedores registrados.'}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
