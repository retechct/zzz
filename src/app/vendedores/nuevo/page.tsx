'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Distrito {
  id_distrito: number;
  nombre: string;
}

interface Especialidad {
  id_especialidad: number;
  nombre: string;
}

export default function NuevoVendedorPage() {
  const [nom_ven, setNomVen] = useState('');
  const [ape_ven, setApeVen] = useState('');
  const [cel_ven, setCelVen] = useState('');
  const [id_distrito, setIdDistrito] = useState('');
  const [id_especialidad, setIdEspecialidad] = useState(''); // AÑADIDO
  const [distritos, setDistritos] = useState<Distrito[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]); // AÑADIDO
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      // Cargar distritos
      const resDistritos = await fetch('/api/distritos');
      const dataDistritos = await resDistritos.json();
      setDistritos(dataDistritos);

      // Cargar especialidades
      const resEspecialidades = await fetch('/api/especialidades');
      const dataEspecialidades = await resEspecialidades.json();
      setEspecialidades(dataEspecialidades);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/vendedores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        nom_ven, 
        ape_ven, 
        cel_ven, 
        id_distrito, 
        id_especialidad // AÑADIDO
      }),
    });
    router.push('/vendedores');
    router.refresh();
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h1>Registrar Nuevo Vendedor</h1>
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
          <input type="text" id="cel_ven" value={cel_ven} onChange={(e) => setCelVen(e.target.value)} className="form-control" pattern="[0-9]{9}" placeholder="987654321" required />
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
        <div className="mb-3"> {/* BLOQUE AÑADIDO */}
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
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
}