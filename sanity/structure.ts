import type { StructureResolver } from 'sanity/structure';

const SINGLETONS = [
  { id: 'siteSettings', title: '⚙️ Configuración del sitio' },
  { id: 'homePage', title: '🏠 Inicio' },
  { id: 'specialtiesPage', title: '📋 Especialidades (página)' },
  { id: 'teamPage', title: '🧑‍⚖️ Nuestro Equipo (página)' },
  { id: 'aboutPage', title: 'ℹ️ Quiénes Somos (página)' },
];

/**
 * Custom desk structure so a non-technical editor sees the site's 5
 * fixed pages up top (each opens straight into its single document,
 * no "create new" confusion) and the two real collections —
 * Especialidades and Equipo — below as editable lists.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      ...SINGLETONS.map(({ id, title }) =>
        S.listItem()
          .id(id)
          .title(title)
          .child(S.document().schemaType(id).documentId(id)),
      ),
      S.divider(),
      S.listItem()
        .id('specialty')
        .title('📄 Lista de especialidades')
        .child(
          S.documentTypeList('specialty')
            .title('Especialidades')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),
      S.listItem()
        .id('teamMember')
        .title('👥 Lista del equipo')
        .child(
          S.documentTypeList('teamMember')
            .title('Equipo')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),
    ]);
