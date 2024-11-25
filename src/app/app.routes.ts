import { Routes } from '@angular/router';
import { initialDataResolver } from './core/resolvers/initial-resolver';
import { LayoutComponent } from './layout/layout/layout.component';
import { MainComponent } from './pages/main/main.component';
import { CategoryComponent } from './pages/main/category/category.component';
import { SubcategoryComponent } from './pages/main/subcategory/subcategory.component';
import { DetailProductComponent } from './pages/main/detail-product/detail-product.component';
import { RepuestosComponent } from './pages/main/repuestos/repuestos.component';
import { NovedadesComponent } from './pages/main/novedades/novedades.component';
import { OfertasComponent } from './pages/main/ofertas/ofertas.component';
import { OutletComponent } from './pages/main/outlet/outlet.component';
import { CalidadComponent } from './pages/empresa/calidad/calidad.component';
import { SobreNosotrosComponent } from './pages/empresa/sobre-nosotros/sobre-nosotros.component';
import { ContactoComponent } from './pages/empresa/contacto/contacto.component';
import { ProfesionalesComponent } from './pages/empresa/profesionales/profesionales.component';
import { ServiciosComponent } from './pages/empresa/servicios/servicios.component';
import { NewsDetailComponent } from './pages/main/news/news-detail/news-detail.component';
import { ShoppingCartComponent } from './pages/empresa/shopping-cart/shopping-cart.component';
import { CatalogoComponent } from './pages/main/catalogo/catalogo.component';
import { SearchComponent } from './pages/main/search/search.component';
import { ViewNewsComponent } from './pages/main/view-news/view-news.component';
import { TextWebComponent } from './pages/main/text-web/text-web.component';

export const routes: Routes = [
  {
    path: '',
    title: "Manufacturas Deportivas", resolve: {
      initialData: initialDataResolver,
    },
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'categoria',
        component: CategoryComponent
      },
      {
        path: 'categoria/:id',
        component: CategoryComponent
      },
      {
        path: 'subcategory/:id',
        component: SubcategoryComponent
      },
      {
        path: 'detail-product/:id',
        component: DetailProductComponent
      },
      {
        path: 'repuestos',
        component: RepuestosComponent
      },
      {
        path: 'novedades',
        component: NovedadesComponent
      },
      {
        path: 'ofertas',
        component: OfertasComponent
      },
      {
        path: 'outlet',
        component: OutletComponent
      },
      {
        path: 'empresa/garantia',
        component: CalidadComponent
      },
      {
        path: 'empresa/sobrenosotros',
        component: SobreNosotrosComponent
      },
      {
        path: 'empresa/contacto',
        component: ContactoComponent
      },
      {
        path: 'empresa/servicios',
        component: ServiciosComponent
      },
      {
        path: 'empresa/profesionales',
        component: ProfesionalesComponent
      },
      {
        path: 'empresa/detail-news/:id',
        component: NewsDetailComponent
      },
      {
        path: 'shopping',
        component: ShoppingCartComponent
      },
      {
        path: 'catalogo',
        component: CatalogoComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'view-news',
        component: ViewNewsComponent
      },
      {
        path: 'info/:id',
        component: TextWebComponent
      }
  
    ]
  },
];
