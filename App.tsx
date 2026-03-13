import { useState, useEffect } from "react";

const STORAGE_KEY = "stock-gastronomia-v1";
const UNIDADES = ["kg","g","l","ml","u","cajas","bolsas","latas","paquetes","pilones","barras","hormas","maples","cajones","ramos","ramitas","puñados","cajitas"];

const initialInsumos = [
  { id:1,  nombre:"Pan de campo",             categoria:"Panadería", cantidad:0, unidad:"u",       minimo:5,   maximo:20,  proveedor:"", obs:"" },
  { id:2,  nombre:"Pan árabe",                categoria:"Panadería", cantidad:0, unidad:"u",       minimo:30,  maximo:100, proveedor:"", obs:"" },
  { id:3,  nombre:"Pan baguette blanco",       categoria:"Panadería", cantidad:0, unidad:"u",       minimo:10,  maximo:40,  proveedor:"", obs:"" },
  { id:4,  nombre:"Pan baguette masa madre",   categoria:"Panadería", cantidad:0, unidad:"u",       minimo:5,   maximo:20,  proveedor:"", obs:"" },
  { id:5,  nombre:"Pan de molde",              categoria:"Panadería", cantidad:0, unidad:"u",       minimo:1,   maximo:5,   proveedor:"", obs:"" },
  { id:6,  nombre:"Pan de molde con semillas", categoria:"Panadería", cantidad:0, unidad:"u",       minimo:1,   maximo:5,   proveedor:"", obs:"" },
  { id:7,  nombre:"Pan de miga",               categoria:"Panadería", cantidad:0, unidad:"pilones", minimo:2,   maximo:6,   proveedor:"", obs:"" },
  { id:8,  nombre:"Baguel",                    categoria:"Panadería", cantidad:0, unidad:"u",       minimo:10,  maximo:30,  proveedor:"", obs:"" },
  { id:9,  nombre:"Focaccia",                  categoria:"Panadería", cantidad:0, unidad:"u",       minimo:4,   maximo:12,  proveedor:"", obs:"" },
  { id:10, nombre:"Croissant",                 categoria:"Panadería", cantidad:0, unidad:"u",       minimo:50,  maximo:150, proveedor:"", obs:"" },
  { id:11, nombre:"Medialunas",                categoria:"Panadería", cantidad:0, unidad:"u",       minimo:60,  maximo:180, proveedor:"", obs:"" },
  { id:12, nombre:"Pizzas 8 porciones",        categoria:"Panadería", cantidad:0, unidad:"u",       minimo:10,  maximo:30,  proveedor:"", obs:"" },
  { id:13, nombre:"Pizzas masa madre",         categoria:"Panadería", cantidad:0, unidad:"u",       minimo:10,  maximo:30,  proveedor:"", obs:"" },
  { id:14, nombre:"Jamón cocido",              categoria:"Fiambres",  cantidad:0, unidad:"barras",  minimo:1,   maximo:3,   proveedor:"", obs:"" },
  { id:15, nombre:"Bondiola",                  categoria:"Fiambres",  cantidad:0, unidad:"barras",  minimo:1,   maximo:3,   proveedor:"", obs:"" },
  { id:16, nombre:"Milán",                     categoria:"Fiambres",  cantidad:0, unidad:"barras",  minimo:1,   maximo:3,   proveedor:"", obs:"" },
  { id:17, nombre:"Panceta salada",            categoria:"Fiambres",  cantidad:0, unidad:"barras",  minimo:1,   maximo:3,   proveedor:"", obs:"" },
  { id:18, nombre:"Peperoni",                  categoria:"Fiambres",  cantidad:0, unidad:"barras",  minimo:0.5, maximo:2,   proveedor:"", obs:"" },
  { id:19, nombre:"Mozzarella",                categoria:"Lácteos",   cantidad:0, unidad:"barras",  minimo:1,   maximo:4,   proveedor:"", obs:"" },
  { id:20, nombre:"Tybo",                      categoria:"Lácteos",   cantidad:0, unidad:"barras",  minimo:1,   maximo:4,   proveedor:"", obs:"" },
  { id:21, nombre:"Queso reggianito",          categoria:"Lácteos",   cantidad:0, unidad:"hormas",  minimo:1,   maximo:3,   proveedor:"", obs:"" },
  { id:22, nombre:"Cheddar barra",             categoria:"Lácteos",   cantidad:0, unidad:"barras",  minimo:0.5, maximo:2,   proveedor:"", obs:"" },
  { id:23, nombre:"Cheddar líquido",           categoria:"Lácteos",   cantidad:0, unidad:"bolsas",  minimo:0.5, maximo:2,   proveedor:"", obs:"" },
  { id:24, nombre:"Queso crema",               categoria:"Lácteos",   cantidad:0, unidad:"bolsas",  minimo:0.5, maximo:2,   proveedor:"", obs:"" },
  { id:25, nombre:"Manteca",                   categoria:"Lácteos",   cantidad:0, unidad:"pilones", minimo:0.5, maximo:2,   proveedor:"", obs:"" },
  { id:26, nombre:"Crema de leche",            categoria:"Lácteos",   cantidad:0, unidad:"u",       minimo:1,   maximo:5,   proveedor:"", obs:"" },
  { id:27, nombre:"Leche",                     categoria:"Lácteos",   cantidad:0, unidad:"u",       minimo:8,   maximo:24,  proveedor:"", obs:"" },
  { id:28, nombre:"Leche condensada",          categoria:"Lácteos",   cantidad:0, unidad:"u",       minimo:2,   maximo:6,   proveedor:"", obs:"" },
  { id:29, nombre:"Dulce de leche",            categoria:"Lácteos",   cantidad:0, unidad:"u",       minimo:1,   maximo:4,   proveedor:"", obs:"" },
  { id:30, nombre:"Palta",                     categoria:"Verdulería", cantidad:0, unidad:"u",      minimo:0.5, maximo:2,   proveedor:"", obs:"" },
  { id:31, nombre:"Cherris",                   categoria:"Verdulería", cantidad:0, unidad:"u",      minimo:0.5, maximo:2,   proveedor:"", obs:"" },
  { id:32, nombre:"Tomates",                   categoria:"Verdulería", cantidad:0, unidad:"u",      minimo:10,  maximo:30,  proveedor:"", obs:"" },
  { id:33, nombre:"Lechuga",                   categoria:"Verdulería", cantidad:0, unidad:"paquetes",minimo:2,  maximo:6,   proveedor:"", obs:"" },
  { id:34, nombre:"Rúcula",                    categoria:"Verdulería", cantidad:0, unidad:"paquetes",minimo:2,  maximo:6,   proveedor:"", obs:"" },
  { id:35, nombre:"Cebolla",                   categoria:"Verdulería", cantidad:0, unidad:"bolsas",  minimo:0.5,maximo:2,   proveedor:"", obs:"" },
  { id:36, nombre:"Perejil",                   categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:1,  maximo:3,   proveedor:"", obs:"" },
  { id:37, nombre:"Ajo",                       categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:1,  maximo:3,   proveedor:"", obs:"" },
  { id:38, nombre:"Berenjenas",                categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:5,  maximo:15,  proveedor:"", obs:"" },
  { id:39, nombre:"Zanahoria",                 categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:6,  maximo:18,  proveedor:"", obs:"" },
  { id:40, nombre:"Morrón",                    categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:6,  maximo:18,  proveedor:"", obs:"" },
  { id:41, nombre:"Manzana",                   categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:10, maximo:30,  proveedor:"", obs:"" },
  { id:42, nombre:"Manzana verde",             categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:5,  maximo:15,  proveedor:"", obs:"" },
  { id:43, nombre:"Banana",                    categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:12, maximo:36,  proveedor:"", obs:"" },
  { id:44, nombre:"Kiwi",                      categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:10, maximo:30,  proveedor:"", obs:"" },
  { id:45, nombre:"Durazno",                   categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:6,  maximo:18,  proveedor:"", obs:"" },
  { id:46, nombre:"Ananá",                     categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:4,  maximo:10,  proveedor:"", obs:"" },
  { id:47, nombre:"Naranja cajón",             categoria:"Verdulería", cantidad:0, unidad:"cajones", minimo:1,  maximo:3,   proveedor:"", obs:"" },
  { id:48, nombre:"Limón cajón",               categoria:"Verdulería", cantidad:0, unidad:"cajones", minimo:0.5,maximo:2,   proveedor:"", obs:"" },
  { id:49, nombre:"Frutillas cajón",           categoria:"Verdulería", cantidad:0, unidad:"cajones", minimo:0.5,maximo:2,   proveedor:"", obs:"" },
  { id:50, nombre:"Pera",                      categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:3,  maximo:9,   proveedor:"", obs:"" },
  { id:51, nombre:"Uvas ramo",                 categoria:"Verdulería", cantidad:0, unidad:"ramos",   minimo:2,  maximo:6,   proveedor:"", obs:"" },
  { id:52, nombre:"Ciruela",                   categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:10, maximo:30,  proveedor:"", obs:"" },
  { id:53, nombre:"Sandía",                    categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:1,  maximo:3,   proveedor:"", obs:"" },
  { id:54, nombre:"Melón",                     categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:1,  maximo:3,   proveedor:"", obs:"" },
  { id:55, nombre:"Pepino",                    categoria:"Verdulería", cantidad:0, unidad:"u",       minimo:2,  maximo:6,   proveedor:"", obs:"" },
  { id:56, nombre:"Jengibre",                  categoria:"Verdulería", cantidad:0, unidad:"ramitas", minimo:1,  maximo:3,   proveedor:"", obs:"" },
  { id:57, nombre:"Albahaca",                  categoria:"Verdulería", cantidad:0, unidad:"puñados", minimo:1,  maximo:3,   proveedor:"", obs:"" },
  { id:58, nombre:"Arándanos",                 categoria:"Verdulería", cantidad:0, unidad:"cajitas", minimo:4,  maximo:10,  proveedor:"", obs:"" },
  { id:59, nombre:"Huevos maples",             categoria:"Huevos",     cantidad:0, unidad:"maples",  minimo:5,  maximo:15,  proveedor:"", obs:"" },
  { id:60, nombre:"Chocolate semi amargo",     categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:0.5,  maximo:2,    proveedor:"", obs:"" },
  { id:61, nombre:"Chocolate blanco",          categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:0.5,  maximo:2,    proveedor:"", obs:"" },
  { id:62, nombre:"Chocolate para submarino",  categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:0.25, maximo:1,    proveedor:"", obs:"" },
  { id:63, nombre:"Cacao Quillá",              categoria:"Insumos generales", cantidad:0, unidad:"bolsas", minimo:0.25, maximo:1,    proveedor:"", obs:"" },
  { id:64, nombre:"Cacao amargo",              categoria:"Insumos generales", cantidad:0, unidad:"bolsas", minimo:0.25, maximo:1,    proveedor:"", obs:"" },
  { id:65, nombre:"Mayonesa 3 kg",             categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:1,    maximo:3,    proveedor:"", obs:"" },
  { id:66, nombre:"Nueces",                    categoria:"Insumos generales", cantidad:0, unidad:"g",      minimo:500,  maximo:1500, proveedor:"", obs:"" },
  { id:67, nombre:"Salsa tomate triturado",    categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:2,    maximo:6,    proveedor:"", obs:"" },
  { id:68, nombre:"Esencia de vainilla",       categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:0.5,  maximo:2,    proveedor:"", obs:"" },
  { id:69, nombre:"Durazno en mitades en lata",categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:2,    maximo:6,    proveedor:"", obs:"" },
  { id:70, nombre:"Aceite Natura",             categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:0.5,  maximo:2,    proveedor:"", obs:"" },
  { id:71, nombre:"Aceite de oliva",           categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:0.5,  maximo:2,    proveedor:"", obs:"" },
  { id:72, nombre:"Azúcar impalpable",         categoria:"Insumos generales", cantidad:0, unidad:"kg",     minimo:2,    maximo:8,    proveedor:"", obs:"" },
  { id:73, nombre:"Azúcar morena",             categoria:"Insumos generales", cantidad:0, unidad:"kg",     minimo:1,    maximo:4,    proveedor:"", obs:"" },
  { id:74, nombre:"Merengue caja",             categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:0.25, maximo:1,    proveedor:"", obs:"" },
  { id:75, nombre:"Canela",                    categoria:"Insumos generales", cantidad:0, unidad:"g",      minimo:200,  maximo:600,  proveedor:"", obs:"" },
  { id:76, nombre:"Bicarbonato",               categoria:"Insumos generales", cantidad:0, unidad:"g",      minimo:200,  maximo:600,  proveedor:"", obs:"" },
  { id:77, nombre:"Almidón de maíz",           categoria:"Insumos generales", cantidad:0, unidad:"kg",     minimo:2,    maximo:6,    proveedor:"", obs:"" },
  { id:78, nombre:"Polvo de hornear",          categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:0.5,  maximo:2,    proveedor:"", obs:"" },
  { id:79, nombre:"Colorantes",                categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:1,    maximo:3,    proveedor:"", obs:"" },
  { id:80, nombre:"Harina 0000",               categoria:"Insumos generales", cantidad:0, unidad:"kg",     minimo:10,   maximo:30,   proveedor:"", obs:"" },
  { id:81, nombre:"Harina leudante",           categoria:"Insumos generales", cantidad:0, unidad:"kg",     minimo:10,   maximo:30,   proveedor:"", obs:"" },
  { id:82, nombre:"Harina integral",           categoria:"Insumos generales", cantidad:0, unidad:"kg",     minimo:2,    maximo:6,    proveedor:"", obs:"" },
  { id:83, nombre:"Harina de mandioca",        categoria:"Insumos generales", cantidad:0, unidad:"kg",     minimo:5,    maximo:15,   proveedor:"", obs:"" },
  { id:84, nombre:"Sal fina",                  categoria:"Insumos generales", cantidad:0, unidad:"kg",     minimo:1,    maximo:3,    proveedor:"", obs:"" },
  { id:85, nombre:"Sal gruesa",                categoria:"Insumos generales", cantidad:0, unidad:"kg",     minimo:1,    maximo:3,    proveedor:"", obs:"" },
  { id:86, nombre:"Coco rallado",              categoria:"Insumos generales", cantidad:0, unidad:"kg",     minimo:1,    maximo:3,    proveedor:"", obs:"" },
  { id:87, nombre:"Dulce de membrillo",        categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:0.25, maximo:1,    proveedor:"", obs:"" },
  { id:88, nombre:"Dulce de batata",           categoria:"Insumos generales", cantidad:0, unidad:"u",      minimo:0.25, maximo:1,    proveedor:"", obs:"" },
  { id:89, nombre:"Avena",                     categoria:"Insumos generales", cantidad:0, unidad:"kg",     minimo:3,    maximo:9,    proveedor:"", obs:"" },
  { id:90, nombre:"Mix semillas",              categoria:"Insumos generales", cantidad:0, unidad:"kg",     minimo:0.25, maximo:1,    proveedor:"", obs:"" },
  { id:91, nombre:"Granola",                   categoria:"Insumos generales", cantidad:0, unidad:"kg",     minimo:1,    maximo:3,    proveedor:"", obs:"" },
  { id:92, nombre:"Masitas Chocolinas",        categoria:"Insumos generales", cantidad:0, unidad:"paquetes",minimo:10,  maximo:30,   proveedor:"", obs:"" },
  { id:93, nombre:"Masitas Oreo",              categoria:"Insumos generales", cantidad:0, unidad:"paquetes",minimo:10,  maximo:30,   proveedor:"", obs:"" },
  { id:94, nombre:"Masitas Maná",              categoria:"Insumos generales", cantidad:0, unidad:"paquetes",minimo:10,  maximo:30,   proveedor:"", obs:"" },
  { id:95, nombre:"Masitas vainilla",          categoria:"Insumos generales", cantidad:0, unidad:"paquetes",minimo:2,   maximo:6,    proveedor:"", obs:"" },
  { id:96,  nombre:"Mermelada durazno",        categoria:"Mermeladas", cantidad:0, unidad:"u", minimo:1, maximo:4, proveedor:"", obs:"" },
  { id:97,  nombre:"Mermelada sauco",          categoria:"Mermeladas", cantidad:0, unidad:"u", minimo:1, maximo:4, proveedor:"", obs:"" },
  { id:98,  nombre:"Mermelada frutos rojos",   categoria:"Mermeladas", cantidad:0, unidad:"u", minimo:1, maximo:4, proveedor:"", obs:"" },
  { id:99,  nombre:"Mermelada higo",           categoria:"Mermeladas", cantidad:0, unidad:"u", minimo:1, maximo:4, proveedor:"", obs:"" },
  { id:100, nombre:"Mermelada frutilla",       categoria:"Mermeladas", cantidad:0, unidad:"u", minimo:1, maximo:4, proveedor:"", obs:"" },
  { id:101, nombre:"Mermelada mora",           categoria:"Mermeladas", cantidad:0, unidad:"u", minimo:1, maximo:4, proveedor:"", obs:"" },
  { id:102, nombre:"Mermelada zapallo",        categoria:"Mermeladas", cantidad:0, unidad:"u", minimo:1, maximo:4, proveedor:"", obs:"" },
  { id:103, nombre:"Mermelada quinoto",        categoria:"Mermeladas", cantidad:0, unidad:"u", minimo:1, maximo:4, proveedor:"", obs:"" },
  { id:104, nombre:"Caja 1/2 pizza",                  categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:105, nombre:"Caja pizza",                      categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:106, nombre:"Cajas blancas para torta",        categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:107, nombre:"Cajas marrones para torta",       categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:108, nombre:"Caja gourmet tipo zapato",        categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:109, nombre:"Cajas de hamburguesas",           categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:110, nombre:"Vasos descartables con tapa",     categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:111, nombre:"Bandejas sandwich simple",        categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:112, nombre:"Bandejas sandwich triple",        categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:113, nombre:"Bandeja dorada tipo flor 26cm",   categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:114, nombre:"Vaso café chico descartable",     categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:115, nombre:"Vaso café grande descartable",    categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:116, nombre:"Vaso descartable con tapa",       categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:117, nombre:"Ensaladeras",                     categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:118, nombre:"Individual postre",               categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:119, nombre:"Individual postre grande",        categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:120, nombre:"Bolsas rollo 10x15",              categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:121, nombre:"Bolsas rollo 40x20",              categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:122, nombre:"Papel film",                      categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:123, nombre:"Papel manteca",                   categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:124, nombre:"Papel aluminio",                  categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:125, nombre:"Folex 20x25",                     categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:126, nombre:"Pinchos",                         categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:127, nombre:"Toalla reutilizable azul",        categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:128, nombre:"Rollo cocina",                    categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:129, nombre:"Toallas intercaladas p/mano",     categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:130, nombre:"Papel higiénico",                 categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:131, nombre:"Etiquetas",                       categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:132, nombre:"Cuchillos descartables",          categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:133, nombre:"Tenedores descartables",          categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:134, nombre:"Cucharas descartables",           categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:135, nombre:"Cuchara helado descartable",      categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:136, nombre:"Cinta Sticko",                    categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:137, nombre:"Cinta papel",                     categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:138, nombre:"Bolsa camiseta 30x40",            categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:139, nombre:"Bolsa camiseta 40x50",            categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:140, nombre:"Bolsa camiseta 50x60",            categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:141, nombre:"Bolsa consorcio 60x90",           categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:142, nombre:"Bolsa consorcio 45x60",           categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:143, nombre:"Bolsa papel madera N°5",          categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:144, nombre:"Bolsa cubiertos 5x25",            categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:145, nombre:"Pote helado 1/4 kg",              categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:146, nombre:"Pote helado 1/2 kg",              categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:147, nombre:"Pote helado 1 kg",                categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:148, nombre:"Sorbetes flex",                   categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:149, nombre:"Rollo posnet",                    categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
  { id:150, nombre:"Rollo impresora térmica",         categoria:"Papelera", cantidad:0, unidad:"u", minimo:1, maximo:5, proveedor:"", obs:"" },
];

function getEstado(cantidad, minimo) {
  if (cantidad <= 0) return "critico";
  if (cantidad <= minimo * 0.5) return "critico";
  if (cantidad <= minimo) return "bajo";
  return "ok";
}

const EST = {
  ok:      { bg:"#D1FAE5", color:"#065F46", label:"OK",      hex:"#1D9E75" },
  bajo:    { bg:"#FEF3C7", color:"#92400E", label:"Bajo",    hex:"#EF9F27" },
  critico: { bg:"#FEE2E2", color:"#991B1B", label:"Crítico", hex:"#E24B4A" },
};

const CAT_COLORES = [
  { bg:"#E6F1FB", text:"#0C447C" },
  { bg:"#E1F5EE", text:"#085041" },
  { bg:"#FAEEDA", text:"#633806" },
  { bg:"#FAECE7", text:"#712B13" },
  { bg:"#EEEDFE", text:"#3C3489" },
  { bg:"#FBEAF0", text:"#72243E" },
  { bg:"#EAF3DE", text:"#27500A" },
  { bg:"#FCEBEB", text:"#791F1F" },
  { bg:"#F1EFE8", text:"#444441" },
];

function getCategorias(ins) { return [...new Set(ins.map(i => i.categoria))].filter(Boolean).sort(); }
function getColorCat(cat, cats) { return CAT_COLORES[cats.indexOf(cat) % CAT_COLORES.length]; }

let nextId = 300;

const lbl = { display:"block", fontSize:13, color:"#6B7280", marginBottom:4, marginTop:12 };
const inp = { width:"100%", fontSize:14, padding:"7px 10px", borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", color:"#111827", boxSizing:"border-box" };
const btn = { fontSize:14, padding:"7px 16px", borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", color:"#374151", cursor:"pointer" };

function ModalActualizar({ insumo, onClose, onGuardar }) {
  const [val, setVal] = useState("");
  const [obs, setObs] = useState(insumo.obs || "");
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:12, padding:"1.5rem", width:"100%", maxWidth:360, boxShadow:"0 20px 60px rgba(0,0,0,0.15)" }}>
        <h2 style={{ margin:"0 0 4px", fontSize:16, fontWeight:600, color:"#111827" }}>{insumo.nombre}</h2>
        <p style={{ margin:"0 0 1.25rem", fontSize:13, color:"#6B7280" }}>Stock registrado: <strong style={{color:"#374151"}}>{insumo.cantidad} {insumo.unidad}</strong></p>
        <label style={lbl}>¿Cuánto hay ahora? ({insumo.unidad})</label>
        <input type="number" min="0" value={val} onChange={e => setVal(e.target.value)} style={{ ...inp, fontSize:24, padding:10, textAlign:"center" }} autoFocus />
        <label style={lbl}>Observación (opcional)</label>
        <textarea value={obs} onChange={e => setObs(e.target.value)} placeholder="Ej: vence pronto, revisar..." rows={2} style={{ ...inp, resize:"vertical", lineHeight:1.5 }} />
        <div style={{ display:"flex", gap:8, marginTop:"1.25rem" }}>
          <button onClick={onClose} style={{ ...btn, flex:1 }}>Cancelar</button>
          <button onClick={() => { if (val === "") return; onGuardar(insumo.id, Number(val), obs); onClose(); }}
            style={{ flex:2, padding:10, fontSize:15, fontWeight:600, borderRadius:8, border:"none", background:"#1D9E75", color:"#fff", cursor:"pointer" }}>
            Guardar stock
          </button>
        </div>
      </div>
    </div>
  );
}

function Modal({ modal, onClose, onAgregar, onEditar, onEliminar, categorias }) {
  const initForm = () => {
    if (modal.tipo === "nuevaCategoria") return { nombre:"", nuevaCategoria:"", cantidad:"0", unidad:"u", minimo:"", maximo:"", proveedor:"", obs:"" };
    if (modal.tipo === "editar") return { nombre:modal.insumo.nombre, categoria:modal.insumo.categoria, cantidad:modal.insumo.cantidad, unidad:modal.insumo.unidad, minimo:modal.insumo.minimo, maximo:modal.insumo.maximo||"", proveedor:modal.insumo.proveedor||"", obs:modal.insumo.obs||"" };
    return { nombre:"", categoria:modal.categoriaDefault||categorias[0]||"", cantidad:"0", unidad:"u", minimo:"", maximo:"", proveedor:"", obs:"" };
  };
  const [form, setForm] = useState(initForm);
  const set = (k,v) => setForm(f => ({ ...f, [k]:v }));

  const handleSubmit = () => {
    if (modal.tipo === "nuevaCategoria") {
      const cat = form.nuevaCategoria.trim();
      if (!form.nombre || !form.minimo || !cat) return;
      onAgregar({ ...form, categoria: cat });
    } else if (modal.tipo === "nuevo") {
      if (!form.nombre || !form.minimo) return;
      onAgregar(form);
    } else {
      if (!form.nombre || !form.minimo) return;
      onEditar(modal.insumo.id, form);
    }
    onClose();
  };

  const titulo = modal.tipo === "nuevaCategoria" ? "Nueva categoría"
    : modal.tipo === "nuevo" ? `Agregar — ${modal.categoriaDefault}`
    : `Editar — ${modal.insumo.nombre}`;

  const campos = (
    <>
      <label style={lbl}>Nombre</label>
      <input type="text" value={form.nombre} onChange={e => set("nombre", e.target.value)} style={inp} autoFocus />
      {modal.tipo === "editar" && <>
        <label style={lbl}>Categoría</label>
        <select value={form.categoria} onChange={e => set("categoria", e.target.value)} style={inp}>
          {categorias.map(c => <option key={c}>{c}</option>)}
        </select>
      </>}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        <div><label style={lbl}>Cantidad actual</label><input type="number" min="0" value={form.cantidad} onChange={e => set("cantidad", e.target.value)} style={inp} /></div>
        <div><label style={lbl}>Unidad</label><select value={form.unidad} onChange={e => set("unidad", e.target.value)} style={inp}>{UNIDADES.map(u => <option key={u}>{u}</option>)}</select></div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        <div><label style={lbl}>Stock mínimo</label><input type="number" min="0" value={form.minimo} onChange={e => set("minimo", e.target.value)} style={inp} /></div>
        <div><label style={lbl}>Stock máximo</label><input type="number" min="0" value={form.maximo} onChange={e => set("maximo", e.target.value)} style={inp} /></div>
      </div>
      <label style={lbl}>Proveedor (opcional)</label>
      <input type="text" value={form.proveedor||""} onChange={e => set("proveedor", e.target.value)} placeholder="Ej: Distribuidora García..." style={inp} />
      <label style={lbl}>Observaciones (opcional)</label>
      <textarea value={form.obs} onChange={e => set("obs", e.target.value)} placeholder="Ej: revisar vencimiento..." rows={2} style={{ ...inp, resize:"vertical", lineHeight:1.5 }} />
    </>
  );

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:12, padding:"1.5rem", width:"100%", maxWidth:420, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 20px 60px rgba(0,0,0,0.15)" }}>
        <h2 style={{ margin:"0 0 1.25rem", fontSize:16, fontWeight:600, color:"#111827" }}>{titulo}</h2>
        {modal.tipo === "nuevaCategoria" && <>
          <label style={lbl}>Nombre de la nueva categoría</label>
          <input type="text" value={form.nuevaCategoria} onChange={e => set("nuevaCategoria", e.target.value)} placeholder="Ej: Bebidas" style={inp} autoFocus />
          <label style={{ ...lbl, marginTop:16, fontWeight:500, color:"#374151" }}>Primer producto</label>
        </>}
        {campos}
        <div style={{ display:"flex", gap:8, marginTop:"1.25rem", justifyContent:"flex-end" }}>
          {modal.tipo === "editar" && <button onClick={() => { onEliminar(modal.insumo.id); onClose(); }} style={{ ...btn, color:"#DC2626", borderColor:"#FECACA", marginRight:"auto" }}>Eliminar</button>}
          <button onClick={onClose} style={btn}>Cancelar</button>
          <button onClick={handleSubmit} style={{ ...btn, background:"#185FA5", color:"#fff", border:"none", fontWeight:600 }}>
            {modal.tipo === "editar" ? "Guardar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FilaInsumo({ ins, onActualizar, onEditar, onObsChange }) {
  const est = getEstado(ins.cantidad, ins.minimo);
  const s = EST[est];
  const max = ins.maximo || ins.minimo * 2;
  const pct = Math.min(100, Math.round((ins.cantidad / Math.max(max, 1)) * 100));
  return (
    <div style={{ display:"flex", gap:8, padding:"10px 4px", borderBottom:"1px solid #F3F4F6", alignItems:"center", flexWrap:"wrap" }}>
      <div style={{ flex:"1 1 160px" }}>
        <p style={{ margin:0, fontSize:14, fontWeight:500, color:"#111827" }}>{ins.nombre}</p>
        <div style={{ height:4, background:"#F3F4F6", borderRadius:4, width:"100%", maxWidth:160, marginTop:5 }}>
          <div style={{ height:4, borderRadius:4, width:`${pct}%`, background:s.hex, transition:"width 0.3s" }} />
        </div>
      </div>
      <div style={{ textAlign:"center", minWidth:90 }}>
        <p style={{ margin:0, fontSize:15, fontWeight:600, color:"#111827" }}>{ins.cantidad} <span style={{ fontSize:11, fontWeight:400, color:"#9CA3AF" }}>{ins.unidad}</span></p>
        <p style={{ margin:0, fontSize:11, color:"#9CA3AF" }}>mín {ins.minimo} · máx {ins.maximo||"—"}</p>
      </div>
      <span style={{ fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:6, background:s.bg, color:s.color, whiteSpace:"nowrap" }}>{s.label}</span>
      <div style={{ display:"flex", gap:4 }}>
        <button onClick={() => onActualizar(ins)} style={{ fontSize:12, padding:"5px 12px", borderRadius:8, border:"none", background:"#1D9E75", color:"#fff", cursor:"pointer", fontWeight:600, whiteSpace:"nowrap" }}>Actualizar</button>
        <button onClick={() => onEditar(ins)} style={{ ...btn, fontSize:11, padding:"3px 8px", color:"#9CA3AF" }}>✎</button>
      </div>
      <textarea value={ins.obs||""} onChange={e => onObsChange(ins.id, e.target.value)} placeholder="Observaciones..." rows={1}
        style={{ flex:"1 1 140px", fontSize:12, padding:"5px 8px", resize:"vertical", borderRadius:8, border:"1px solid #E5E7EB", background:"#F9FAFB", color:"#374151", fontFamily:"sans-serif", lineHeight:1.5, boxSizing:"border-box" }} />
    </div>
  );
}

function CategoriaBlock({ categoria, insumos, onActualizar, onEditar, onObsChange, onAgregarProducto, colorCat }) {
  const [abierto, setAbierto] = useState(false);
  const alertas = insumos.filter(i => getEstado(i.cantidad, i.minimo) !== "ok");
  return (
    <div style={{ marginBottom:"0.75rem", border:"1px solid #E5E7EB", borderRadius:12, overflow:"hidden" }}>
      <button onClick={() => setAbierto(a => !a)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", background:colorCat.bg, border:"none", cursor:"pointer", textAlign:"left" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:14, fontWeight:600, color:colorCat.text }}>{categoria}</span>
          <span style={{ fontSize:12, color:colorCat.text, opacity:0.65 }}>{insumos.length} productos</span>
          {alertas.length > 0 && <span style={{ fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:6, background:"#FEE2E2", color:"#991B1B" }}>{alertas.length} alerta{alertas.length>1?"s":""}</span>}
        </div>
        <span style={{ fontSize:20, color:colorCat.text, transform:abierto?"rotate(90deg)":"none", transition:"transform 0.2s" }}>›</span>
      </button>
      {abierto && (
        <div style={{ padding:"8px 12px 16px", background:"#fff" }}>
          {insumos.map(ins => <FilaInsumo key={ins.id} ins={ins} onActualizar={onActualizar} onEditar={onEditar} onObsChange={onObsChange} />)}
          <button onClick={() => onAgregarProducto(categoria)} style={{ width:"100%", marginTop:12, padding:10, fontSize:14, fontWeight:600, borderRadius:8, border:"none", background:"#185FA5", color:"#fff", cursor:"pointer" }}>
            + Agregar producto
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [insumos, setInsumos] = useState(initialInsumos);
  const [historial, setHistorial] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modal, setModal] = useState(null);
  const [modalActualizar, setModalActualizar] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.insumos) setInsumos(d.insumos);
        if (d.historial) setHistorial(d.historial);
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ insumos, historial })); } catch {}
  }, [insumos, historial, loaded]);

  const actualizarStock = (id, nuevaCantidad, obs) => {
    const ins = insumos.find(i => i.id === id);
    if (!ins) return;
    setInsumos(prev => prev.map(i => i.id === id ? { ...i, cantidad:nuevaCantidad, obs } : i));
    setHistorial(prev => [{ id:Date.now(), insumoId:id, insumoNombre:ins.nombre, cantidadAnterior:ins.cantidad, cantidadNueva:nuevaCantidad, fecha:new Date().toLocaleString("es-AR") }, ...prev]);
  };

  const agregarInsumo = (data) => setInsumos(prev => [...prev, { ...data, id:++nextId, cantidad:Number(data.cantidad)||0, minimo:Number(data.minimo), maximo:data.maximo?Number(data.maximo):null, proveedor:data.proveedor||"", obs:data.obs||"" }]);
  const editarInsumo = (id, data) => setInsumos(prev => prev.map(i => i.id === id ? { ...i, ...data, cantidad:Number(data.cantidad), minimo:Number(data.minimo), maximo:data.maximo?Number(data.maximo):null } : i));
  const eliminarInsumo = (id) => setInsumos(prev => prev.filter(i => i.id !== id));
  const actualizarObs = (id, obs) => setInsumos(prev => prev.map(i => i.id === id ? { ...i, obs } : i));

  const categorias = getCategorias(insumos);
  const alertas = insumos.filter(i => getEstado(i.cantidad, i.minimo) !== "ok");
  const criticos = insumos.filter(i => getEstado(i.cantidad, i.minimo) === "critico");
  const listaCompras = insumos.filter(i => { const max = i.maximo || i.minimo * 2; return i.cantidad < max; });
  const insumosFiltrados = busqueda ? insumos.filter(i => i.nombre.toLowerCase().includes(busqueda.toLowerCase())) : null;

  const TABS = [["dashboard","Resumen"],["stock","Inventario"],["compras",`Compras${alertas.length?` (${alertas.length})`:""}`],["historial","Historial"]];

  return (
    <div style={{ fontFamily:"system-ui, sans-serif", maxWidth:900, margin:"0 auto", padding:"1rem 1rem 3rem", background:"#F9FAFB", minHeight:"100vh" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.25rem", padding:"1rem 1.25rem", background:"#fff", borderRadius:12, border:"1px solid #E5E7EB" }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, margin:0, color:"#111827", letterSpacing:"0.04em", textTransform:"uppercase" }}>Limbo Patisserie</h1>
          <p style={{ fontSize:12, color:"#9CA3AF", margin:"3px 0 0", letterSpacing:"0.06em" }}>Control de stock</p>
        </div>
        <button onClick={() => setModal({ tipo:"nuevaCategoria" })} style={{ fontSize:13, padding:"8px 16px", borderRadius:8, border:"none", background:"#185FA5", color:"#fff", cursor:"pointer", fontWeight:600 }}>+ Nueva categoría</button>
      </div>

      <div style={{ display:"flex", gap:2, marginBottom:"1.25rem", background:"#fff", borderRadius:10, border:"1px solid #E5E7EB", padding:4 }}>
        {TABS.map(([key,label]) => (
          <button key={key} onClick={() => setTab(key)} style={{ flex:1, padding:"8px 4px", fontSize:13, fontWeight:tab===key?600:400, borderRadius:8, border:"none", background:tab===key?"#F3F4F6":"transparent", color:tab===key?"#111827":"#6B7280", cursor:"pointer", transition:"all 0.15s" }}>{label}</button>
        ))}
      </div>

      {tab === "dashboard" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(130px,1fr))", gap:10, marginBottom:"1.25rem" }}>
            {[
              { label:"Total insumos", value:insumos.length, color:"#111827", bg:"#fff" },
              { label:"En orden", value:insumos.length-alertas.length, color:"#065F46", bg:"#D1FAE5" },
              { label:"Stock bajo", value:alertas.length-criticos.length, color:"#92400E", bg:"#FEF3C7" },
              { label:"Críticos", value:criticos.length, color:"#991B1B", bg:"#FEE2E2" },
            ].map(({ label, value, color, bg }) => (
              <div key={label} style={{ background:bg, borderRadius:10, padding:"1rem", textAlign:"center", border:"1px solid #E5E7EB" }}>
                <p style={{ margin:"0 0 6px", fontSize:12, color:"#6B7280" }}>{label}</p>
                <p style={{ margin:0, fontSize:28, fontWeight:700, color }}>{value}</p>
              </div>
            ))}
          </div>

          <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:12, padding:"1.25rem", marginBottom:"1.25rem" }}>
            <p style={{ margin:"0 0 1rem", fontSize:14, fontWeight:600, color:"#111827" }}>Estado por categoría</p>
            <div style={{ display:"grid", gap:12 }}>
              {categorias.map(cat => {
                const ci = insumos.filter(i => i.categoria === cat);
                const cCrit = ci.filter(i => getEstado(i.cantidad,i.minimo)==="critico").length;
                const cBajo = ci.filter(i => getEstado(i.cantidad,i.minimo)==="bajo").length;
                const cOk   = ci.length - cCrit - cBajo;
                const color = getColorCat(cat, categorias);
                return (
                  <div key={cat}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:5 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:12, fontWeight:600, padding:"2px 10px", borderRadius:6, background:color.bg, color:color.text }}>{cat}</span>
                        <span style={{ fontSize:12, color:"#9CA3AF" }}>{ci.length}</span>
                      </div>
                      <div style={{ display:"flex", gap:10, fontSize:12 }}>
                        {cCrit>0 && <span style={{ color:"#DC2626", fontWeight:600 }}>{cCrit} crítico{cCrit>1?"s":""}</span>}
                        {cBajo>0 && <span style={{ color:"#D97706", fontWeight:600 }}>{cBajo} bajo{cBajo>1?"s":""}</span>}
                        {cCrit===0 && cBajo===0 && <span style={{ color:"#059669", fontWeight:600 }}>Todo OK ✓</span>}
                      </div>
                    </div>
                    <div style={{ height:6, borderRadius:4, background:"#F3F4F6", display:"flex", overflow:"hidden" }}>
                      <div style={{ width:`${Math.round(cOk/ci.length*100)}%`, background:"#1D9E75", transition:"width 0.3s" }} />
                      <div style={{ width:`${Math.round(cBajo/ci.length*100)}%`, background:"#EF9F27" }} />
                      <div style={{ width:`${Math.round(cCrit/ci.length*100)}%`, background:"#E24B4A" }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display:"flex", gap:16, marginTop:14 }}>
              {Object.entries(EST).map(([k,s]) => (
                <div key={k} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:"#6B7280" }}>
                  <div style={{ width:10, height:10, borderRadius:2, background:s.hex }} />{s.label}
                </div>
              ))}
            </div>
          </div>

          {criticos.length > 0 && (
            <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:12, padding:"1rem 1.25rem" }}>
              <p style={{ margin:"0 0 10px", fontSize:14, fontWeight:600, color:"#DC2626" }}>⚠ Insumos críticos — reponer urgente</p>
              <div style={{ display:"grid", gap:6 }}>
                {criticos.map(ins => (
                  <div key={ins.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#fff", borderRadius:8, padding:"8px 12px", border:"1px solid #FECACA" }}>
                    <div>
                      <span style={{ fontSize:14, fontWeight:500, color:"#111827" }}>{ins.nombre}</span>
                      <span style={{ fontSize:12, color:"#9CA3AF", marginLeft:8 }}>{ins.categoria}</span>
                    </div>
                    <span style={{ fontSize:13, color:"#DC2626", fontWeight:600 }}>{ins.cantidad} / {ins.minimo} {ins.unidad}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "stock" && (
        <div>
          <div style={{ background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:10, padding:"10px 14px", marginBottom:"1rem", fontSize:13, color:"#1D4ED8" }}>
            Abrí cada categoría, contá físicamente y tocá <strong>Actualizar</strong> en cada producto.
          </div>
          <input placeholder="🔍 Buscar insumo..." value={busqueda} onChange={e => setBusqueda(e.target.value)} style={{ ...inp, marginBottom:"1rem", fontSize:14, padding:"9px 14px", background:"#fff" }} />
          {insumosFiltrados
            ? insumosFiltrados.length === 0
              ? <p style={{ color:"#9CA3AF", fontSize:14, textAlign:"center", padding:"2rem 0" }}>No se encontraron insumos.</p>
              : insumosFiltrados.map(ins => <FilaInsumo key={ins.id} ins={ins} onActualizar={i => setModalActualizar(i)} onEditar={i => setModal({ tipo:"editar", insumo:i })} onObsChange={actualizarObs} />)
            : categorias.map(cat => (
                <CategoriaBlock key={cat} categoria={cat} insumos={insumos.filter(i => i.categoria===cat)}
                  onActualizar={i => setModalActualizar(i)}
                  onEditar={i => setModal({ tipo:"editar", insumo:i })}
                  onObsChange={actualizarObs}
                  onAgregarProducto={c => setModal({ tipo:"nuevo", categoriaDefault:c })}
                  colorCat={getColorCat(cat, categorias)}
                />
              ))
          }
        </div>
      )}

      {tab === "compras" && (
        <div>
          <p style={{ fontSize:13, color:"#6B7280", margin:"0 0 1rem" }}>Lista para llegar al stock máximo. Ordenada por urgencia.</p>
          {listaCompras.length === 0 ? (
            <div style={{ textAlign:"center", padding:"3rem 0", background:"#fff", borderRadius:12, border:"1px solid #E5E7EB" }}>
              <p style={{ fontSize:40, margin:"0 0 8px" }}>✓</p>
              <p style={{ fontSize:15, color:"#6B7280" }}>Todo está al máximo. ¡Nada que comprar!</p>
            </div>
          ) : (
            <>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))", gap:10, marginBottom:"1rem" }}>
                {[
                  { label:"A reponer", value:listaCompras.length, color:"#111827" },
                  { label:"Críticos", value:criticos.length, color:"#DC2626" },
                  { label:"Bajos", value:alertas.length-criticos.length, color:"#D97706" },
                  { label:"Cerca del máx.", value:listaCompras.length-alertas.length, color:"#6B7280" },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:10, padding:"0.75rem", textAlign:"center" }}>
                    <p style={{ margin:"0 0 4px", fontSize:11, color:"#6B7280" }}>{label}</p>
                    <p style={{ margin:0, fontSize:22, fontWeight:700, color }}>{value}</p>
                  </div>
                ))}
              </div>
              <div style={{ display:"grid", gap:8 }}>
                {[...listaCompras].sort((a,b) => { const o={critico:0,bajo:1,ok:2}; return o[getEstado(a.cantidad,a.minimo)]-o[getEstado(b.cantidad,b.minimo)]; }).map(ins => {
                  const s = EST[getEstado(ins.cantidad,ins.minimo)];
                  const max = ins.maximo || ins.minimo * 2;
                  const comprar = Math.max(0, max - ins.cantidad);
                  const color = getColorCat(ins.categoria, categorias);
                  return (
                    <div key={ins.id} style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:10, padding:"12px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                        <span style={{ fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:6, background:s.bg, color:s.color, whiteSpace:"nowrap" }}>{s.label}</span>
                        <span style={{ fontSize:11, padding:"2px 8px", borderRadius:6, background:color.bg, color:color.text, whiteSpace:"nowrap" }}>{ins.categoria}</span>
                        <p style={{ margin:0, fontWeight:500, fontSize:14, color:"#111827", flex:1 }}>{ins.nombre}</p>
                        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                          <div style={{ textAlign:"center" }}>
                            <p style={{ margin:0, fontSize:11, color:"#9CA3AF" }}>Actual</p>
                            <p style={{ margin:0, fontSize:16, fontWeight:600, color:"#111827" }}>{ins.cantidad}<span style={{ fontSize:10, fontWeight:400 }}> {ins.unidad}</span></p>
                          </div>
                          <div style={{ textAlign:"center" }}>
                            <p style={{ margin:0, fontSize:11, color:"#9CA3AF" }}>Máximo</p>
                            <p style={{ margin:0, fontSize:16, fontWeight:600, color:"#111827" }}>{max}<span style={{ fontSize:10, fontWeight:400 }}> {ins.unidad}</span></p>
                          </div>
                          <div style={{ textAlign:"center", minWidth:60 }}>
                            <p style={{ margin:0, fontSize:11, color:"#9CA3AF" }}>Comprar</p>
                            <p style={{ margin:0, fontSize:20, fontWeight:700, color:"#1D9E75" }}>{comprar}<span style={{ fontSize:11, fontWeight:400 }}> {ins.unidad}</span></p>
                          </div>
                        </div>
                      </div>
                      {ins.proveedor && <p style={{ margin:"6px 0 0", fontSize:12, color:"#6B7280" }}>Proveedor: <strong style={{ color:"#374151" }}>{ins.proveedor}</strong></p>}
                      {ins.obs && <p style={{ margin:"4px 0 0", fontSize:12, color:"#9CA3AF", fontStyle:"italic" }}>{ins.obs}</p>}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {tab === "historial" && (
        <div>
          <p style={{ fontSize:13, color:"#6B7280", margin:"0 0 1rem" }}>Registro de cada actualización de stock.</p>
          {historial.length === 0
            ? <div style={{ textAlign:"center", padding:"3rem 0", background:"#fff", borderRadius:12, border:"1px solid #E5E7EB" }}><p style={{ fontSize:14, color:"#9CA3AF" }}>Todavía no se realizó ningún control de stock.</p></div>
            : <div style={{ display:"grid", gap:6 }}>
                {historial.map(mov => (
                  <div key={mov.id} style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ flex:1 }}>
                      <p style={{ margin:0, fontWeight:500, fontSize:14, color:"#111827" }}>{mov.insumoNombre}</p>
                      <p style={{ margin:"2px 0 0", fontSize:12, color:"#9CA3AF" }}>{mov.fecha}</p>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <p style={{ margin:0, fontSize:13, color:"#6B7280" }}>
                        {mov.cantidadAnterior} → <strong style={{ color:"#111827", fontSize:15 }}>{mov.cantidadNueva}</strong>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
          }
        </div>
      )}

      {modalActualizar && <ModalActualizar insumo={modalActualizar} onClose={() => setModalActualizar(null)} onGuardar={actualizarStock} />}
      {modal && <Modal modal={modal} onClose={() => setModal(null)} onAgregar={agregarInsumo} onEditar={editarInsumo} onEliminar={eliminarInsumo} categorias={categorias} />}
    </div>
  );
}