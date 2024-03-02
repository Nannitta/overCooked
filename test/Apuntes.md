code .make# TESTING WITH DDD (Domain Driven Desing) IN PHP

Podemos distinguir:

## Dentro de test
-   Aceptación
-   Unitarios   

## Dentro de src
-   Value Objects
-   Controladores
-   Commands / Querys
-   Excepciones
-   Interfaces
-   Handlers(manejadores)  

## Test de aceptación.

-   Se localizan en la carpeta aceptance de test.

-   Su nombre se compone de la accion a realizar (get, add, update....) acabado de acceptance test.

-   Es una clase que se extiende de webtestCase.

-   Traemos HelperFunctions.

-   Declaramos el KernelBrowser en la variable $client y la Connection en la varible $connection. Estas variables se pueden almacenar en el setUp

-   El test lo definiremos como una public function precedida de un comentario @test con un @throw JsonException. Emplearemos el razonamiento de (accion->when->then).

-   Se encarga de realizar los test de la funcionalidad, por ejemplo:
    ```php
        public function asUserIWantToGetEcommerce(): void
    {
        $ecommerceId = EcommerceIdMother::random();

        $this->givenIHaveAEcommerce($ecommerceId);

        $this->whenIQueryForAEcommerce($ecommerceId);

        $this->thenEcommerceSatisfyExpectations($ecommerceId->value());
    }
    ```
-   Cada una de las acciones estará representada mediante una private function encargada de realizar las peticiones del cliente.

    -   En el caso de un get, tendremos que comprobar toda la accion, es decir:
        -   Tendremos que hacer el post del dato.
        ```php
            private function givenIHaveAEcommerce(string $ecommerceId): void
        {
            $this->client->jsonRequest(
                'POST',
                '/api/ecommerce/' . $ecommerceId,
                [
                    'domainName' => 'primor.eu',
                    'country' => 'es',
                ]
            );
            $this->assertEquals(201, $this->client->getResponse()->getStatusCode());
        }
        ```
        -   Tendremos que hacer el get del dato antes insertado.
        ```php
                    private function whenIQueryForAEcommerce(string $ecommerceId): void
            {
                $this->client->jsonRequest(
                    'GET',
                    "/api/ecommerce/$ecommerceId",
                );
            }
        ```
        -   Tendremos que comprbar que el dato que nos devuelve es el que queriamos.

        ```php
                private function thenEcommerceSatisfyExpectations(string $id): void
        {
            $this->assertEquals(200, $this->client->getResponse()->getStatusCode());
            $this->assertJsonStringEqualsJsonString(
                '{"id": "' . $id . '", "domainName": "primor.eu", "country": "es", "status": "PENDING"}',
                $this->client->getResponse()->getContent()
            );
        }
        ```
-   Se podrá añadir un setUp():void para todos los métodos comunes en las funciones. Por ejemplo conoectarse al servidor.

```php
     protected function setUp(): void
    {
        $this->client = static::createClient([], ['HTTP_X_AUTH_TOKEN' => 'aaa']);
        $this->connection = static::getContainer()->get('doctrine.dbal.default_connection');
    }
```

-   Debemos crear siempre una protected function tearDown():void necesaria para que se conecte su con su padre y actualice.

```php
     protected function tearDown(): void
    {
        $this->clearTables(
            $this->connection,
            'ecommerces',
        );

        parent::tearDown();
    }
```

## Controladores.

-   Encargados de realizar la petición al path correspondiente #Route.

-   Se definen como una clase y se extienen hacia su controlador (ApiBaseController, CriteriaBaseController).

-   Empezamos definiendo la ruta y que método utilizaremos

-   Creamos un invoke donde definiremos la varialble request mediante la cual obtendremos los datos. Llamaremos a la propiedad dispatch para hacer un new command pasándole los datos de la request.

-   Retornamos una nueva Response con su status.

-   Creamos una public function getConstraits que devuelva una validacion. Esta estará definida con el nombre de la "variable" en mysql y como tiene que ser el input. En este caso no puede estar en blanco. Podria recivir mas de una restricción, por ejemplo que no venga en blanco y que sea un array.

-   Para el correcto funcionamiento necesitaremos importar los Asserts y  "ValidatorCollection" ambos están renombrados de sus padres: Constraits y Collection respectivamente.

```php
use Symfony\Component\Validator\Constraints\Collection as ValidatorCollection;

class AddEcommerceController extends ApiBaseController
{
    #[Route(path: '/api/ecommerce/{id}', name: 'add_ecommerce', methods: ['POST'])]
    public function __invoke(Request $request, string $id): Response
    {
        $domainName = $request->get('domainName');
        $country = $request->get('country');
        $this->dispatch(new AddEcommerceCommand($id, $domainName, $country));

        return new Response(status: Response::HTTP_CREATED);
    }

    public function getConstraints(): ?ValidatorCollection
    {
        return new ValidatorCollection(
            [
                'domainName' => [
                    new Assert\NotBlank(),
                ],
                'country' => [
                    new Assert\NotBlank(),
                ],
            ]
        );
    }
}
```

##  Commands / Querys

-   Se encuentran en la carpeta application de src.

-   Los commands se encargan de modificar la data, mientras que los querys de consultarla.

-   Es una clase que se implementa de un command o una query.

-   Se contruyen con el constructor definiendo las variables que necesite el manejador.

```php
class AddEcommerceCommand implements Command
{
    public function __construct(
        public readonly string $ecommerceId,
        public readonly string $domainName,
        public readonly string $country,
    ) {
    }
}
```

## Manejadores (command / query)

-   Se encuentran en la carpeta application de src. Comparten carpeta con los command y query.

-   Son una clase que se implementa "implements" con commandHandler y query respectivamente.

-   Se contruyen mediante construct definiendo la clase y recogiendola en una variable (sobre la que vamos a hacer la acción).

-   La instrucción la declaramos mediante el método __invoke pasandole como parámetro el command, recogiendolo en una variable.

-   Recogeremos todas las variables que vamos a necesitar.

-   Recogeremos en una variable mediante id el dato que queremos analizar, en el caso de un post si existe el dato mediante su id, lanzaremos la clase que recoge la excepcion. En el caso de un get, si no existe lanzaremos la clase que recoge dicha excepcion.

-   En el caso de ser un get retornara la clase que recoge la respuesta pasándole los valores que necesita.

```php
    return new GetEcommerceResponse($ecommerce);
```

-   En el caso de ser un Post recogeremos en una variable los valores del nuevo objeto. Llamaremos a la función correspondiente para hacer el post introduciendo como parametro la variable antes mencionada.

```php
class AddEcommerceCommandHandler implements CommandHandler
{
    public function __construct(private readonly EcommerceRepository $ecommerceRepository)
    {
    }

    public function __invoke(AddEcommerceCommand $command): void
    {
        $ecommerceId = new EcommerceId($command->ecommerceId);
        $domainName = new DomainName($command->domainName);
        $country = new Country($command->country);

        $alreadyExistEcommerce = $this->ecommerceRepository->ofId($ecommerceId);
        if (null !== $alreadyExistEcommerce) {
            throw new EcommerceAlreadyExists();
        }

        $ecommerce = new Ecommerce($ecommerceId, $domainName, $country);

        $this->ecommerceRepository->add($ecommerce);
    }
}
```

## Test unitarios.

*   Podemos distinguir dos tipos de test, los de aplicación y los de dominio.

### Test de aplicación. (COMMAND-HANDLER-TEST)

-   Es una clase que se extiene de TestCase.

-   Definimos la "clase" privada, asignándosela a una variable.

-   Definimos si necesitamos una protected function setUp, si queremos que un determinado código se ejecute al principio de cada función. Por ejemplo, crear un Mock para para el repositorio.

-   Creamos un test cada una de las posibles fallas mediante public functions. (estas funciones no devuelven nada :void).

-   Si el test le lanza, tendremos que lanzar una excepción (expectedException). Esta la tendremos que definir en la carpeta de dominio de src. //Véase el apartado exceptiones.//

-   Si todo funciona correctamente, creamos la variable command y llamamos el command correspondiente pasándole los parametros que necesitemos.

-   Llamaremos a la funcion manejadora del handler pasandole como parametro el repositorio con el que compararemos los ressultados.

-   Llamaremos al metodo invoke desde la variable handler pasandole como parámetro el command. Haremos cada uno de estos pasos para cada una de los posibles tests. Podremos refactorizar, metiendo el comand dentro del handler.

```php
class AddEcommerceCommandHandlerTest extends TestCase
{
    private EcommerceRepository | MockObject $repository;

    public function testFailIfInvalidIdentifier(): void
    {

        $id = "ivalidId";
        $domain = "";
        $country = "";
        $status = "";

        $this->expectException(InvalidEcommerceIdentifier::class);

        $command = new AddEcommerceCommand($id, $domain, $country, $status);

        $handler = new AddEcommerceCommandHandler($this->repository);

        $handler->__invoke($command);
    }

    public function testAddEcommerce(): void
    {
        $ecommerceId = EcommerceIdMother::random();
        $domain = DomainNameMother::random();
        $country = CountryMother::random();
        $status = StatusMother::random();

        $command = new AddEcommerceCommand(
            $ecommerceId->value(),
            $domain->value(),
            $country->value(),
            $status->value,
        );

        $this->repository
            ->expects(self::once())
            ->method('ofId')
            ->with($ecommerceId)
            ->willReturn(null);

        $this->repository
            ->expects(self::once())
            ->method('add')
            ->with(new Ecommerce($ecommerceId, $domain, $country, $status));

        $handler = new AddEcommerceCommandHandler($this->repository);

        $handler->__invoke($command);
    }

    protected function setUp(): void
    {
        $this->repository = $this->createMock(EcommerceRepository::class);
    }
}

```

## Excepciones.

-   Se encuentran en la carpeta dominio dentro de src.

-   Comparte carpeta con las clases principales.

-   Necesitamos llamar a Exception. Es una clase que extiende a Exception.

```php
use Exception;

class InvalidEcommerceIdentifier extends Exception
{

}
```

## Clase principal (objeto de actuación)

-   Se encuentra en la carpeta de dominio de src.

-   Es la clase principal con la que vamos a trabajar.

-   Se declaran de forma privada las variables que va a contener.

-   Mediante un constructor y pasandole como parametros todas las variables anteriores, enlazándolas con sus nombre de clase y recogiendolas en una variable.

-   Dentro del constructor asignaremos a cada varible (mediante $this->nombreDeLavariable = $nombreDeLaVariable) su valor (los inputs del constructor).

-   Definiermos tantas funciones como variables, almenos para poder devolver su valor.

```php

class Ecommerce
{
    private EcommerceId $id;
    private DomainName $domainName;
    private Country $country;
    private Status $status;

    public function __construct(EcommerceId $id, DomainName $domainName, Country $country)
    {
        $this->id = $id;
        $this->domainName = $domainName;
        $this->country = $country;
        $this->status = Status::PENDING;
    }

    public function getId(): EcommerceId
    {
        return $this->id;
    }

    public function getDomainName(): DomainName
    {
        return $this->domainName;
    }

    public function getCountry(): Country
    {
        return $this->country;
    }

    public function getStatus(): Status
    {
        return $this->status;
    }
}

```

### Clase respuesta (Response)

-   Se encuentra en la carpeta application de src. Comparte carpeta con las query y commands

-   Son una clase que se implementa de la Response

-   Definimos las variables que vamos a recibir tipadas.

-   Creamos con un constructor, pasandole como parámetro la clase padre y recogiendola en una variable.

-   Dentro del constructor creamos la entidad, recogiendo cada uno de los valores.

```php
class GetEcommerceResponse implements Response
{
    public readonly string $id;
    public readonly string $domainName;
    public readonly string $country;
    public readonly string $status;

    public function __construct(Ecommerce $ecommerce)
    {
        $this->id = $ecommerce->getId()->value();
        $this->domainName = $ecommerce->getDomainName()->value();
        $this->country = $ecommerce->getCountry()->value();
        $this->status = $ecommerce->getStatus()->value;
    }
}
```

## Value Objects

-   Se encuentran en la carpeta domino de src

-   Representan un tipo de valor dentro de nuestra aplicación pero no tienen identidad por si mismos.

-   Por ejemplo "country" es un value object que es de tipo country (StringValueObject).

-   Se definen como una clase con su nombre y se extienen hacia el tipo que deberian ser: StringValueObject, uuid...

-   Se crean a partir de un constructor, pasandole como parámetro el tipo y el nombre de la variable a que representa la clase.

-   A partir del contructor definismos las excepciones que deberíamos abordar en el caso de que fuese erroneo el imput.

-   Se propaga hacia su padre.

-   Se pueden añadir funciones estáticas. Como en este caso devolver una variable random.

```php
class Country extends StringValueObject
{
    public static array $countries = ['es', 'fr', 'it', 'uk', 'de', 'pt'];

    public function __construct(string $country)
    {
        if (!in_array($country, self::$countries)) {
            throw new InvalidCountry();
        }
        parent::__construct($country);
    }

    public static function random(): static
    {
        return new static(self::$countries[array_rand(self::$countries, 1)]);
    }
}
```

## Repositorios

-   Definiremos los repositorios como interfaces.

-   Las interfaces de objetos nos permiten definir qué métodos deben ser implementado por una clase, sin tener que definir cómo estos métodos son manipulados, los definiremos dentro de la capa de persistencia->DOCTRINE->Repositories.

-   Se definen igual que una clase, pero se reemplazando la palabra reservada class por interface.

-   Todos los métodos declarados deben de ser públicos.

-   Se encuentran en la carpeta de DOMINIO -> SRC.

```php
interface EcommerceSectorsRespository
{
    public function removeOfEcommerce(EcommerceId $ecommerceId): void;

    public function add(EcommerceSector $ecommerceSector): void;
}

```

## MOCKS

-   Los Mocks se utilizan para "simular" el repositorio. Tienen una sere de opciones para poder realizar las peticiones.

-   Se suelen utilizar en los test unitarios para poder comparar las respuesta que esperas con las que realmente vendrian del repositorio.

-   Las variables que hacen referencia a estos Mocks las solemos poner dentro del setUp ya que generalmente las llamaremos en cada uno de nuestros tests.

-   A la hora de representar los Mocks tendremos por norma general la siguiente estructura:

```php
    private EcommerceRepository|MockObject $ecommerceRepository;

    $this->ecommerceRepository
            ->expects(self::once())
            ->method('ofId')
            ->with($ecomerceId)
            ->willReturn($ecommerce);

     protected function setUp(): void
    {
        $this->ecommerceRepository = $this->createMock(EcommerceRepository::class);
    }        
```

## Mysql-Repository

-   Es la clase donde se encuentran definidos los métodos del repositorio.

-   Extiende de ServiceEntitiRepository y Implementa el repositorio.

-   Definiremos el comportamiento de los métodos mediante funciones públicas para que podamos tener acceso a ellas desde fuera.

```php
    class MySqlEcommerceRepository extends ServiceEntityRepository implements EcommerceRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Ecommerce::class);
    }

    public function ofId(EcommerceId $id): ?Ecommerce
    {
        return $this->find($id);
    }

    public function add(Ecommerce $ecommerce): void
    {
        $this->getEntityManager()->persist($ecommerce);
    }

    public function delete(Ecommerce $ecommerce): void
    {
        $this->getEntityManager()->remove($ecommerce);
    }
}
```

## Mothers

-   Se localizan en la Carpeta TEST dentro de Domain.

-   Son clases en las que definimos métodos que simulan la obtención de determinados datos. Estos métodos provienen de su ValueObject. Su finalidad es encapsular esas llamadas.

```php
    class EcommerceIdMother
{
    public static function random(): EcommerceId
    {
        return EcommerceId::random();
    }
}
```

## Carpeta Config

-   En esta carpeta encontraremos todas las configuraciones de packages, rutas y excepciones.

    -   Dentro de las EXCEPCIONES se encuentran los mappings y las excepciones.

## Dataproviders (proveedores de datos)

-   Son una interface que se encuentra en la misma carpeta que los value Objects (SRC->DOMAIN)

-   Se emplean para la capa de representación, es decir cuando hacemos una Query. Lo que nos indica es el conjunto de datos que vamos a "recivir" de la response (mediante un comentario antes de la public function).

```php
    interface EcommerceDataProvider
{
    /**
     * @return array<string, string, string, string>
     */
    public function matchingCriteria(Criteria $criteria): array;
}
```

## Migrations

-   Las migration las podemos definir como la traduccion de nuestro codigo a mysql.

-   Se hace en la consola mediante docker composer.

-   Esto creará un archivo dentro de la carpeta MIGRATION en src/COMMON/INFRASTRUCTURE/PERSISTENCIA/DOCTRINE.

-   Este archivo tendrá como nombre Version + el momento de crearla (año-mes-dia-hora....).

-   El archivo suele venir con comentarios y con funcionalidades que no necesitamos, por lo que necesitamos hacer refactor sobre el.

```php
    final class Version20230215110839 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE ecommerces_sectors (
          id VARCHAR(36) NOT NULL,
          ecommerce_id VARCHAR(36) NOT NULL,
          sector_id VARCHAR(36) NOT NULL,
          PRIMARY KEY(id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        $this->addSql('CREATE INDEX ecommerces_sectors_ecommerce_id_idx 
            ON ecommerces_sectors(ecommerce_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE ecommerces_sectors');
    }
}
```
## CRITERIA

-   Es un conjunto de clases que contiene filtros. Estos filtros son value objects creados por nosotros mismos.

-   Son una "final class".

-   Se construyen como cualquier otra clase (__constructor).

-   En ella podemos definir sus metodos mediante public functions, para poder tener acceso a ellos.

-   Dentro de su mismo PATH se crearán cada uno de sus métodos donde definiremos su comportamiento.

-   Estos Filtros se definiran igual.

```php
inal class Criteria
{
    public function __construct(
        private Filters $filters,
        private Order $order,
        private ?int $offset,
        private ?int $limit
    ) {
    }

    public function hasFilters(): bool
    {
        return $this->filters->count() > 0;
    }

    public function hasOrder(): bool
    {
        return !$this->order->isNone();
    }

    public function plainFilters(): array
    {
        return $this->filters->filters();
    }

    public function filters(): Filters
    {
        return $this->filters;
    }
}
```

## Servicios de Dominio

-   Son una dependencia que atraves de un mock en el que pasandole un parámetro (en este caso una url) nos devolverá algo, (en este caso lo que queremos es una copia de la pag correspondiente a la url).

##  ORM-XML

-   Es una archivo XML, que define las "tablas" que contiene el valueObject

```xml
    <doctrine-mapping xmlns="http://doctrine-project.org/schemas/orm/doctrine-mapping">
    <entity name="App\Matching\Domain\EcommerceRanking\Ecommerce\Ecommerce" table="ecommerces">
        <id name="id" type="ecommerceId"/>
        <field name="domainName" column="domain" type="domainName"/>
        <field name="country" type="country"/>
        <field name="status" length="15" enum-type="App\Matching\Domain\EcommerceRanking\Ecommerce\Status"/>
    </entity>
</doctrine-mapping>
```

## Factory

-   Es un tipo de servicio especial. Es una clase que se encarga de la construcción de otra clase.

## Guzzle

-   Es una libreria de producción que se encarga de hacer peticiones.

-   Se encuentran en la carpeta COMMUNICATIONS dentro de INFRAESTRUCTURE.

-   Se encargan de hacer cosas por nosotros, por ejemplo a partir de un ean hacen una peticion get a una api para obtener datos.

-   El nombre empieza por la libreria que utilizamos para hacer la petición, seguida del nombre de la api que utilizamos seguida del cliente en este caso.

```php
    class GuzzleKeepaClient implements KeepaClient
{
    public function __construct(private readonly ClientInterface $client, private readonly Sleeper $sleeper)
    {
    }

    /**
     * @throws GuzzleException
     */
    public function scrapProductPage(Ean $ean): string
    {
        $contents = $this->client->request(
            'GET',
            'https://api.keepa.com/product',
            [
                RequestOptions::QUERY => [
                    'key' => 'dp58l972h89h3bkq7562ckg2p87p3rj6qnofmi0k5e373kp6u8l57rto3fdd1h8e',
                    'domain' => 9,
                    'code' => $ean->value(),
                ],
            ],
        )->getBody()->getContents();
        $decoded = json_decode($contents, true, 512, JSON_THROW_ON_ERROR);
        if ($decoded['tokensLeft'] < 50) {
            $this->sleeper->uSleep(500 + $decoded['refillIn'] * 1000);
        }
        return $contents;
    }
}
```

## EVENTOS

-   Como cualquier funcionalidad que queramos darle a nuestra aplicación, debemos empezar siempre por los test de acceptación.
-   En el caso de los eventos solo los vamos a testear con test unitarios.    

-   La clase encargada de lanzar el evento, tendrá que tener en su constructor el método. Deberá implementar AggregateRoot y usar AgrregateRootTrait.
```php
$this->recordthat(new NombreDelEvento());
```

-   La clase encargada de "invocar" el evento es el eventHandler (handlerOnEvent).
    - Implementa EventHandler.
    - En el construtor tendremos el commandBus.
    - Dentro del método invoke será donde dispacharemos el command que controla el caso de uso.

    ```php
     public function __construct(private readonly CommandBus $commandBus)
    {
    }

    public function __invoke(EcommerceProductCreated $event)
    {
        $this->commandBus->dispatch(new UpdateEcommerceProductsCountCommand($event->ecommerceId));
    }
    ```
-   El commnadHandler es el encargado del dispatch del evento. Recogerá el evento de la clase encargada de lanzarlo mediante el método de antes popEvents();
    -   El eventBus (que le llegaría mediante constructor) sería el encargado de lanzar el evento.
    ```php
        $event = $ecommerceProduct->popEvents();
        $this->eventBus->dispatch(...$event);
    ```
-   Los eventos debemos registrarlos en el messenger.yaml, y le asignaremos una "cola".

-   A la hora de testear un evento:
    -   Mockearemos el eventBuss.
    -   A este lo llamaremos con el método 'dispatch', pasandole como parámetros un new del evento con sus parámetros necesarios.
    ```php
        $this->eventBus
                ->expects(self::once())
                ->method('dispatch')
                ->with(
                    new EcommerceProductCreated(
                        $newEcommerceProduct->ecommerceProductId->value(),
                        $ecommerce->ecommerceId->value()
                    )
                );

    ```


# Notas

#### tipos de arrays:
-   Indexado -> array normal por índice de números
-   Asociativo -> Array por índice de nombres: clave -> valor. En json se ve como un objeto.

### Funciones regulares

-   Son un sistema para buscar, capturar o reemplzar texto utilizando patrones. Estos patrones permiten realizar una búsqueda de texto de una forma abstracta. Estos patrones se representan mediante una cadena de texto, donde ciertos símbolos tienen un significado especial. 

### commands consola:

-   console exec app php -> entras en la aplicación.
-   bin/console -> nos permite conectar con la consola de la aplicación. 
-   docker compose run app bash -> entras en la consola de la aplición.

```bash
compose exec app php bin/console import
```

## DTOS

-   Los DTO son un tipo de objetos que sirven únicamente para transportar datos, estos datos deben de ser datos primitivos. 

-   Los Command, las Querys y los events.

-   Contiene las propiedades del objeto.

## YAML files

-   Son archivos de configuración para Symfony. 

-   Las tabulaciones son la base de su estructura.

## keepa.

-   Es un extensión de amazon que monitorea los precios de los productos.

## Expresiones CRON

-   Las usaremos a la hora de ejecutar comandos "programados" en consola.

## Reflections.
-   Su función principal es poder acceder a métodos privados de determinadas clases.

-   Se emplea para crear un "clon" de otra clase.

-   Se puede emplear incluso dentro de un método.
    ```php
    public function ejemplo(int $variableConElNuevoValor) {
        $reflection = new Reflection::class($variableDeDominio);
        $reflection
        ->getProperty('nombre de la propiedad')
        ->setValue($variableDeDominio, $variableConElNuevoValor);
    }
    ```

## Infection
-   Libreria que nos muta el código para conocer que robustos son los tests que tenemos y el alcance real que tienen.

-   Hemos creado un script para instalar esta libreria en nuestro proyecto. ./bin/install_infection.sh

-   Para poder ejecutar esta libreria tendremos que dirigirnos al bash de la consola carpeta html -> e introducir infection --threads=4.

-   Para cualquier duda consultar la documentación: https://infection.github.io/guide/index.html


## My Sql.

* Seleccionar una fila con contenido json de una tabla, renombrar un elemento de ese json y eliminar el viejo. 

```sql
SELECT JSON_REMOVE(JSON_SET(kpis, '$."events.medium"', kpis->>'$."events.normal"'), '$."events.normal"') FROM kpi_logs;


UPDATE kpi_logs
SET kpis = JSON_REMOVE(JSON_SET(kpis, '$."events.medium"', kpis->>'$."events.normal"'), '$."events.normal"');
```


##  Coalescencia 
- Si la variable existe y no es nula, se muestra su valor. En caso contrario se hará lo siguiente.
    ```php
    $variable??$variable=4;
    ```

## Movimiento de archivos:

-   A la hora de refactorizar en el movimiento de archivos, hacerlo siempre con la funcionalidad de F2.
-   Hay que tener en cuenta que tendremos que revisar los mappings, y la parte de configuración, las routes en el caso de mover los archivos a otro bounded context.
-   Tambien tendremos que revisar el archivo servicces.yaml, al igual que los orm, en el caso de que tengamos que cambiar algunas rutas.
-   En el caso de mover archivos que se refieran tanto al type como a Orms, debemos modificar tambień las rutas en el fichero doctrine.yaml.



