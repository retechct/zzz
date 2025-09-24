'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Distrito {
  id_distrito: number;
  nombre: string;
}

interface Especialidad {
  id_especialidad: number;
  nombre: string;
}

export default function EditarVendedorPage() {
  const [nom_ven, setNomVen] = useState('');
  const [ape_ven, setApeVen] = useState('');
  const [cel_ven, setCelVen] = useState('');
  const [id_distrito, setIdDistrito] = useState('');
  const [id_especialidad, setIdEspecialidad] = useState('');
  const [distritos, setDistritos] = useState<Distrito[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    async function fetchData() {
      // Cargar distritos y especialidades en paralelo
      const [distritosRes, especialidadesRes] = await Promise.all([
        fetch('/api/distritos'),
        fetch('/api/especialidades')
      ]);
      const distritosData = await distritosRes.json();
      const especialidadesData = await especialidadesRes.json();
      setDistritos(distritosData);
      setEspecialidades(especialidadesData);

      // Cargar datos del vendedor a editar
      if (id) {
        const vendedorRes = await fetch(`/api/vendedores/${id}`);
        const vendedorData = await vendedorRes.json();
        setNomVen(vendedorData.nom_ven);
        setApeVen(vendedorData.ape_ven);
        setCelVen(vendedorData.cel_ven);
        setIdDistrito(vendedorData.id_distrito?.toString() || '');
        setIdEspecialidad(vendedorData.id_especialidad?.toString() || '');
      }
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/vendedores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        nom_ven, 
        ape_ven, 
        cel_ven, 
        id_distrito, 
        id_especialidad
      }),
    });
    router.push('/vendedores');
    router.refresh();
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h1>Editar Vendedor</h1>
      <form onSubmit={handleSubmit} className="card p-4 mt-4">
        <div className="mb-3">
          <label htmlFor="nom_ven" className="form-label">Nombre</label>
          <input type="text" id="nom_ven" value={nom_ven} onChange={(e) => setNomVen(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="ape_ven" className="form-label">Apellido</label>
          <input type="text" id="ape_ven" value={ape_ven} onChange={(e) => setApeVen(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="cel_ven" className="form-label">Celular</label>
          <input type="text" id="cel_ven" value={cel_ven} onChange={(e) => setCelVen(e.target.value)} className="form-control" pattern="[0-9]{9}" required />
        </div>
        <div className="mb-3">
          <label htmlFor="id_distrito" className="form-label">Distrito</label>
          <select id="id_distrito" value={id_distrito} onChange={(e) => setIdDistrito(e.target.value)} className="form-select" required>
            <option value="">Seleccione un distrito</option>
            {distritos.map((distrito) => (
              <option key={distrito.id_distrito} value={distrito.id_distrito}>
                {distrito.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="id_especialidad" className="form-label">Especialidad</label>
          <select id="id_especialidad" value={id_especialidad} onChange={(e) => setIdEspecialidad(e.target.value)} className="form-select" required>
            <option value="">Seleccione una especialidad</option>
            {especialidades.map((especialidad) => (
              <option key={especialidad.id_especialidad} value={especialidad.id_especialidad}>
                {especialidad.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <Link href="/vendedores" className="btn btn-secondary">Cancelar</Link>
          <button type="submit" className="btn btn-primary">Actualizar</button>
        </div>
      </form>
    </div>
  );
}