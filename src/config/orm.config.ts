import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions:DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'mypassword',
    database: 'ecommerce',
    synchronize:false,
    // entities: [join(__dirname, '**', '*.entity{.ts,.js}')], //gives all the entity for working for migration run 
    entities: [__dirname + '/../**/*.entity{.js,.ts}'],  //for generating migration and crud
    // migrations:[__dirname+'dist/db/*.js'], //here we should pass the path of migration file
    // migrations:['./src/db/migrations/*.ts'],   //here we should pass the path of migration file
    // migrationsTableName: 'migrations_TypeORM',
    // migrationsRun:true,
    
}
export const datasourceOptions = {
    ...dataSourceOptions,
    migrations:[__dirname + '/../db/migrations/*{.ts,.js}'],   //here we should pass the path of migration file
    migrationsTableName: 'migrations_TypeORM',
    migrationsRun:true,
}
const dataSource = new DataSource(datasourceOptions);

export default dataSource;