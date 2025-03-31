# **📌 자료형(Type)이란 무엇인가?**

변수는 값을 저장할 수 있는 공간이다.

개발자는 변수를 선언하며 변수에 특정한 값인 데이터를 할당한다.

즉, 변수에 어떤 종류의 값이 저장될 수 있는지를 나타내는 개념이다.

### 변수에 저장할수 있는 값의 종류 → 자바스크립트는 총 7개 (기본 타입)가 존재한다.

- undefined
- null
- Boolean
- String
- Symbol
- Number(Numeric) Number BigInt
- Object

즉 이렇게 변수에 저장할 수 있는 값의 종류는 7개이다.

개발자는 타입을 사용하여 값의 종류를 명시하거나, 메모리를 더욱 효율적으로 사용할 수 있다는 점을 기억해야한다.

# 타입스크립트에서 타입은 집합으로 해석할 수 있다.

특히 타입스크립트에서 타입을 접근할때는 이 비유법이 효과적이다.

예를 들어 number 타입은 [... -2, -1, 0, 1, 2, ...]처럼 **숫자들의 집합**이라고 볼 수 있습니다.

### 예시로, 입력받은 매개변수 값을 3배에서 return 해주는 함수가 있다.

```tsx
function triple(x) {
  return x * 3;
}
```

자바스크립트는 매개변수에 타입을 강제하지 않기 때문에 매개변수 타입이 “String”이라면 의도치 않는 오류 혹은 의도치 않은 결과를 얻어낼 것이다.

위의 같은 경우, x에 3와 같은 숫자를 넣으면 정상적으로 결과값 (9)가 도출되겠지만, 만일 문자열이 input 된다면 “NaN”이라는 의도치 않은 결과가 나올 것이다.

**의도치 않은 결과가 나온 것 뿐이지 사실 오류는 나지 않는다.**

**💡 자바스크립트의 자유로움이 부작용이 되기도 한다.**

# 자바스크립트는 동적 타입, 타입스크립트는 정적 타입

그렇다면 자바스크립트에는 타입이 아예 없는가? 전혀 그렇지 않다.

**동적타입과 정적타입이 정해지는 기준은 타입을 결정하는 시점에 따라 다른 것이다.**

### 동적인 자바스크립트의 타입은 런타임에 정해진다.

런타임은 컴파일타임 이후에 변환된 파일이 실제 메모리에 적재되어 쓰일때 필요한 시간이다.

### 정적인 타입스크립트의 타입은 컴파일타임에 정해진다

컴파일 타임이란 사람이 알아볼 수 있는 (개발 코드) 가 기계어(2진수) 로 바뀔떄 필요한 시점이다.

**즉, 정적인 언어는 동적인 언어보다 한 시점 빠르게 결정된다는 것을 알 수 있다.**

### 위와 연관지어, 강타입과 약타입라는 개념도 존재한다.

약타입은 자바스크립트와 같은 유연한 타입으로 연산시에 다른 데이터 타입 두개를 연산시켜도 오류가 발생하지 않는것이다.

강타입은 위와 같은 상황일때, 오류를 발생시키는 것이다.

**즉, 강타입은 다른 타입 간의 연산을 엄격히 금지하는 것이며, 약타입은 허용한다는 것.**

말로만 보면 사실 약타입이 무조건 좋은 것 아닌가? 라는 생각이 들 수 있지만,

‘2’ - 1 =1이다 정도는 납득이 가능해도 3 +[ ] 와 같은 **납득하기 어려운 연산은 어느정도 걸러야한다는 취지가 존재하는 것이다.**

# 타입스크립트의 타입 시스템

## **📌 타입 애너테이션 (Type Annotation)**

변수나 상수 혹은 함수의 인자 , 리턴 값에 타입을 명시적으로 선언하는 것.

이에 따라 컴파일러에게 직접 내가 이런 타입의 값이 저장된다는 것을 명시한다.

언어마다 타입 애네티이션의 방식은 다르다만 TS에선 변수명 뒤에다가 :type 을 붙인다.

## 타입스크립트, 구조적 타이핑

일반적으로 프로그래밍 언어에서 타입은 이름으로 구분한다.

**타입스크립트에서는 이름 대신 구조로 구분한다.**

### 구조적 서브타이핑이란?

타입 시스템은 집합으로 이해 할 수 있다했는데, 타입스크립트의 타입은 값의 집합으로 생각해도 좋다.

객체가 가지고 있는 속성을 바탕으로 구조를 바탕으로 타입을 이해하는 것이 구조적 서브타이핑이다.

```tsx
interface Pet {
	name :string;
}

interface Dog{
	name :string;
	age :number;
}

function greet(pet :Pet){
	console.log('hi' + pet.name;)
}

let dog = {name :'doggi' ,age :2}
greet(dog) //가능!
```

위와 같은 두개의 인터페이스 (타입)이 있을때,

둘은 자명하게 이름은 다르지만, 구조가 비슷하다.

Pet이라는 타입에 속성과 Dog라는 타입의 속성에 동일하게 name이라는 속성이 있다.

분명하게 greet 함수의 매개변수의 타입지정은 Pet 타입이지만, dog 타입의 객체를 매개변수에 넣어도 정상작동한다.

이유는, dog 객체는 Pet 인터페이스가 가지고 있는 name 속성을 가지고 있기 때문에, pet.name이라는 속성 값에 정상적으로 접이 가능하기 때문이다.

### 그렇다면 Pet Interface에 name 말고 다른 속성이 추가가 된다면?

그래도 greet(dog)가 가능할까? → 불가능하다!

**“타입을 따라하려면 구조를 포함하거나 완전히 일치해야 한다!”**

**어떤 타입 A가 타입 B로 사용될 수 있으려면, A는 B가 요구하는 속성을 모두 가지고 있어야 한다.**

```tsx
interface Pet {
  name: string;
  home: string;
}

function greet(pet: Pet) {
  console.log('hi ' + pet.name + ', your home is ' + pet.home);
}

let dog = { name: 'doggi', age: 2 };
greet(dog); // ❌ 오류! Property 'home' is missing
```

### Interface 말고 class에도 똑같이 적용

```tsx
class Pet {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Dog {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

function greet(pet: Pet) {
  console.log('Hi, ' + pet.name);
}

const dog = new Dog('Doggi', 2);
greet(dog); // ✅ 가능!

class Hamster {
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}

const h = new Hamster('Hammy', 'white');
greet(h); // ✅ 가능!
```

클래스도 interface와 마찬가지로 타입으로 간주된다!

해당 타입이 요구하는 속성을 모두 갖고 있다면 구조적으로 호환된다.

**유식하게 말하면 다른 클래스의 인스턴스라도, 구조만 맞으면 함수에 전달 할수있다.**

**결론적으로, 클래스든, 객체든, 구조만 같다면 타입처럼 쓰인다.**

**이것이 TS의 구조적 타이핑인 것.**

### JS에도 구조적 타이핑이란 개념이 있을까? : Duck Typing

애시당초에 JS에는 타입이 없지 않는가?

**함수에 어떤 객체를 넘겨도 런타임 에러가 나지 않으면 다 받아준다는것을 기억하자.**

Duck Typing은 쉽게말하면, 객체의 실제 타입보다는 그 행동(메서드,속성)에 따라 사용가능 여부를 판단하는 방식이다.

### Duck Typing

아래와 같은 자바스크립트 함수가 있다고 가정했을때, thing이라는 매개변수로써 오는 값의 타입은 중요하지 않다.

**그저 그 값에 행동(메서드)가 존재하기만 하면 오케이다.**

thing이라는 매개변수에 quack()이라는 속성(메서드)가 있다면? - OK

```tsx
function quack(thing) {
  if (thing.quack) {
    thing.quack(); // "행동"만 있으면 호출됨
  }
}
```

아래와 같이 극단적으로 match 하지 않아도 오류는 나지 않는다. (대신 undefined)

```tsx
function greet(pet) {
  console.log('hi ' + pet.name);
}

const dog = { name: 'doggi', age: 2 };
greet(dog);

const cat = { age: 3 }; //pet에는 name 속성이 존재했다.
greet(cat); // 🔥 hi undefined
```

→ 즉, 이런이유로 유연한 확장성을 지닌 것은 매우 좋지만, 개발자 입장에서 약간의 불안감은 있을 수 있겠다.

# 타입스크립트의 구조적 타이핑 방식은 무조건 안전할까?

상황으로 요약하자면 아래와 같다.

point2D 타입을 매개변수로 요구하고있다.

그러나 Point3D 타입은 Point2D타입의 구조와 동일하며 + z라는 속성이 하나 더 있다.

즉, 구조적 타이핑으로써의 타입은 동일하다.

그에 따라 print2DPoint함수는 정상 작동한다.

```tsx
interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

function print2DPoint(p: Point2D) {
  console.log(`x: ${p.x}, y: ${p.y}`);
}

const point3D: Point3D = { x: 1, y: 2, z: 3 };
print2DPoint(point3D); // ✅ 동작함! (하지만 위험)
```

**에러가 안나는건 좋지만, TS을 쓴다는 개발자의 의도가 많이 퇴색될 염려는 여전히 존재하겠다.**

# 타입스크립트에서 나온 ‘타입’이라는 새로운 개념

자바스크립트 공부를 처음하면 공부하는 내용인 값!

값 (value)는 쉽게 말하면 메모리에 저장한 모든 데이터이다.

### JS에서 모든 것은 값이다.

1,2,3과 같은 숫자는 물론, 1+2 라는 연산, 문자열, 함수, 매개변수 등 사실 모든것이 값이다.

객체 역시 값이다. 함수는 JS의 런타임 시간대에 객체로 변환되기 때문이다.

**goWork이라는 값(함수)**

```tsx
function goWork(person) {
  console.log('go work', person);
}

const person = '개발자';

const goWork = function goWork(person) {
  console.log('go work', person);
};
```

**그러나, 타입스크립트를 도입하면 값 말고 타입이라는 신 개념이 등장한다.**

## Keyword Type or Interface

먼저, 타입스크립트에서 값은 당연히 존재한다.

또한 타입이라는 새로운 개념도 존재한다.

타입스크립트에서 둘의 공간은 분리되어있다. 즉, 같은 이름의 값과 타입은 공존이 가능하다.

**자바스크립트의 슈퍼셋이라고 유식하게 표현할 수 있겠다.**

type은 : 로 타입 지정을 하고 값은 =로 할당을 한다.

육안으로 구분이 쉽다.

### 당연한게, 타입스크립트에서는 값과 타입 지정을 같이 쓰기 때문이다.

```tsx
interface Job {
  name: string;
  isWorking: boolean;
}

const dev: Job = { name: '협지', isWorking: true };
```

### 타입 지정시 구조분해할당을 하는것에 대하여

매개변수에 바로 구조분해할당을 하던데 이는 권장되는 방식이 아니다.

구조분해할당은 완벽히 객체의 형태를 안다는 가정하에 속성을 바로 빼 개별 변수화 시키는건데

이걸 굳이 매개변수 단계에서 해야할 이유는 없다고 본다.

**따라서 매개변수는 매개변수로 받고, 그 아래다가 받은 객체를 구조분해할당 하는 방식이 적절하다.**

```tsx
function greet({ name }: User) { ... }
// ❌ 오류 나거나 헷갈림 (User 전체를 구조 분해할 수 없을 수도 있음)

function greet(user: User) {
  const { name } = user;
  console.log("Hello, " + name);
}
```

# Class와 Type의 관계 (번외 #1)

### Typescript에서 Class는 두가지의 역할을 동시에한다!

1. 런타임 시간에는 인스턴스 기계공장
2. 컴파일 타임에는 인스턴스를 위한 타입

```tsx
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

function greet(user: User) {
  console.log('Hello, ' + user.name);
}

const u = new User('Alice');
greet(u); // ✅ OK
```

자바스크립트에서의 클래스는 인스턴스 생성 기계에 불과하지만, TypeScript에서는 interface 혹은 type처럼도 쓰인다는 것이다.

### 그렇다면 클래스 타입의 객체는 클래스의 속성과 완전히 일치해야하는가?

**정답: 완전히 일치하지 않아도 상관없다. “속성만 포함”하면 OK다.**

### 위에서 언급했던 구조적 타이핑 생각하면 딱이다.

속성 구조가 같거나, 오히려 더 많아서 과분하거나.

**타입스크립트는 구조적 타입 시스템이라 “일치 여부 || 포함 여부”을 충족하면 상관이 없다는 것이다.**

```tsx
class User {
  name: string;
  age: number;
}

const person1 = { name: 'hi' }; // User type 지정 불가
const person2 = { name: 'hi', age: 23, student: true }; // 얜 가능
```

# Enum이란?

### enum의 정의

enum은 타입스크립트가 타입 시스템 차원에서 지원하는 특수한 const 상수 집합이다.

객체와 헷갈릴만한데 객체는 단순한 값의 묶음이다.

상수의 집합이니 사실 정해진 값을 모아두는 것에 의미를 둔다.

```tsx
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const Direction = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

type Direction = (typeof Direction)[keyof typeof Direction];
```

**이 예시를 보면**

```tsx
enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

function login(role: Role) {
  if (role === Role.Admin) {
    console.log('관리자 로그인');
  }
}

login(Role.User); // ✅ 타입 안정성 Good
login(Role.Admin); // 얘도 가능
login('ADMIN'); // ❌ 오류 (string은 enum 아님)
```

**enum은 값의 내용에 충성하지 않고, enum이라는 집단에 충성한다.**

타입스크립트에서 ADMIN 문자열 타입과, enum소속의 ADMIN이 전혀 다른 기능을한다.

따라서, 안정성이 더욱 더 확보가 되기에, 쓴다.

**의문점 : enum 그 자체가 Type인가?**

enum이 훌륭하고, 안정성있고 타입으로도 쓰이는건 알겠다.

왜 login(Role.User)에서 **enum의 속성 값**을 넘기지?

Role 타입은 enum “전체”인데, 속성 하나인 Role.User랑 같을 수 있어?

**enum 타입을 가져와라 → enum 멤버중 아무나 데려와라 라고 해석하면 쉽다!**

**즉, enum Type = enum.속성 중 하나**

이것도 이해가 안가면 이렇게 이해해도 좋다

enum 타입이란 건 결국, **enum에 정의된 속성들 중 하나만 쓸 수 있는 타입이다**

```tsx
type Role = Role.Admin | Role.User;
```

# 타입 식별 (typeOf & instanceOf)

### typeOf는 7가지의 기본 데이터 타입 + 함수 + 호스트 객체 + Object 객체를 반환한다.

**boolean, null, undefined, Number,BigInt, String, Symbol ,함수 타입, 객체 타입 등등을 반환한다.**

### TS에는 값 공간과 타입 공간이 나뉜다고 했다.

typeOf를 값에 사용한 결과와 타입에 사용한 결과는 다르다.

쉽게 설명하면

```tsx
interface Person {
  first: string;
  last: string;
}

const person = { first: 'wonbin', last: 'choi' };

function email(options: { Person: Person; subject: string; body: string }) {}

const v1 = typeof person; // 객체 (object)
const v2 = typeof email; //함수 (function)

type v1 = typeof person; // Person
type v2 = typeof email; // args 내용 => void
```

위와 같이 할때, 오류가 안나는건 당연하다. (공간 자체가 분리 되있으니까)

또한 값에 대한 typeof와 , type에 대한 typeof는 확연하게 다른 값을 배출한다.

어떤 값을 할당했을 경우, 자바스크립트 런타임 기준의 타입을 배출한다.

어떤 타입을 할당했을 경우, 타입스크립트에서의 타입을 배출한다.

### 클래스는 결국에 함수이다. (클래스의 typeOf 작동방식?)

JS에서 클래스 타입이란 건 없다. **클래스는 결국에 함수이다.**

```tsx
class Person {
  first: string;
  last: string;
  constructor(first: string, last: string) {
    this.first = first;
    this.last = last;
  }
  greet() {
    return 'hi';
  }
}
```

위와 같은 클래스가 존재한다고 가정할때,

```tsx
const classFunction = typeof Person;
type classFunction = typeof Person;
```

const (값으로) 묶었을때는 typeof Person은, function을 배출한다.

→ 그러나 type으로 묶었을때는 function이 아닌 typeof Person이라는 걸 배출한다.

쉽게 말하면, typeof Person은 클래스를 만들때 쓰는 함수 자체의 타입이다.

다시말하면, new로 우리가 인스턴스를 뽑을때 쓰이는 생성자 함수의 타입인 것이다.

단순히, function이 아닌 new를 쓸 수 있으며 결과로 인스턴스를 뽑을 수 있다

(Person객체를 만드는 시멘틱이 담긴것)

```tsx
class Person {
  constructor(public name: string) {}
}

const a: Person = new Person('wonbin'); // ✅ 인스턴스 타입

const b: typeof Person = Person; // ✅ 생성자 함수 타입
const c = new b('choi');
```

**따라서 타입공간에서 class를 정의하면 newable한 타입이기에 const c 같이 새로운 값도 만들어진다 이거다.**

# 원시 타입과 객체 타입

### 원시 타입은 7가지 있다.

null, undefined, Number, BigInt, Boolean, Symbol, String

간단히 설명하면, boolean은 true/false

- undefined는 아직 정의되지 않았다의 의미. (초기화되지 않은 값의 타입) , 변수 선언만하고 값을 할당하지 않은 경우에 반환
- null은 할당할 수 있으며 , undefined가 혼동할수 있지만, 엄연히 다르다. 존재하지 않는다!의 의미를 강조
- number는 말 그대로 숫자인데, 자바에서는 int,float,double을 구별하지만 JS는 구분하지 않고 모두 포용한다. 또한 자바스크립트에는 숫자에 해당하는 원시 값중 NaN (not a number) 혹은 Infinity도 포함한다.
- BigInt 비교적 최신 데이터타입으로 2^53 보다 큰 값을 다룰떄 이용한다
- String 문자열이며, 따옴표 (두개)를 활용해서 표현한다. 백틱을 이용한 템플릿 문자열도 당연히 포함
- Symbol , 생소한 타입이지만, 말 그대로 상징이다. 겹치면 안돼는 값을 표현할때 쓰인다. 유일한 값 메이커!

```tsx
const id1 = Symbol('id');
const id2 = Symbol('id');

console.log(id1 === id2); // 👉 false (절대 다르다!!)
```

### 객체 타입은 원시빼고 나머지.

- Object Type

TS에서의 Object Type은 js의 객체(Object)와 이름은 같은데 약간 다르다.

JS에서 객체는 {key : value} 쌍을 가진 모든 것

함수, 배열 ,클래스도 내부적으로는 전부 개게

**typeof [] → object**

**typeof function(){} → function (그러나 내부적으로는 Object)**

**typeof {} → Object**

**TS는 원시타입이 아닌 모든 것을 Object Type이다. 범용성이 어마무시하다.**

any type과 느낌이 매우 비슷하여, 그렇게 권장되는 타입 지정 방식은 아니다!

- Object 대신 **type or Interface**

흔히 객체를 타이핑하기 위해 자주 사용.

둘의 차이는?

type은 모든 타입 (유니온, 원시 포함)의 별칭을 만들고

interface는 객체 타입만을 위해 존재한다.

```tsx
interface User {
  name: string;
  age: number;
}
```

interface는 oop 처럼 구조 설계를 명확히 표현할 수 있어서 좋다. 특히 클래스와 연결이 가능하여 상속 또 가능.

[https://www.notion.so/11-x-Object-1a51b13e977a808a9058ff6e344f0828](https://www.notion.so/11-x-Object-1a51b13e977a808a9058ff6e344f0828?pvs=21)

```tsx
type User = {
  name: string;
  age: number;
};
```

사실 이렇게 해도 가능하긴하다. 최근 트렌드는 interface를 안쓰는 곳도 많다.

- {}

이건 JS에서 객체선언할때 쓰는거 아닌가? 맞다.

객체 타입이라고 봐도 무방하다. 그러나 이 내부에 속성값을 부여한다면, 이 해당 타입을 따라 선언되는 객체는 정확히 이 타입의 속성구조와 일치해야한다.

```tsx
const follow: { tilte: string } = { title: '하이' };
const follow: { title: string } = { title: '하이', num: '12' };
//👆 에러 발생! → 'num' 속성은 선언된 타입에 없음
```

만약 속성구조가 없는 빈 객체는 어떻게 선언해야하는가?

:{} 이렇게 해도 되지만 권장되는 방식은 아니고 Utility Type으로 지정하는게 현명하다.

- []

자바스크립트 객체 중 세분화된 배열 타입이다.

자바스크립트에선 사실 배열은 객체다. 객체가 슈퍼셋이다.

따라서 typeof [] → 하면 object나서 코딩테스트할때 혼란스러웠을 수 있다.

또한 JS에서 배열에는 숫자,문자열 등등 혼재가 가능했다.

TS에서는 위의 단점들을 없애기 위해 같은 타입끼리만 넣을 수 있고, 배열 타입을 따로 관리한다.

혼재가 필요하다면, 투플로다가..

```tsx
const numArr: number[] = [1, 2, 3, 4]; // ✅ 숫자만
const strArr: string[] = ['a', 'b', 'c']; // ✅ 문자열만
const boolArr: boolean[] = [true, false]; // ✅ 불린만

const tuple: [string, number] = ['wonbin', 24];
// 순서 중요! string → number 아니면 에러

const wrongTuple: [string, number] = [24, 'wonbin']; // ❌ 에러!
```

- function

자바스크립트에선 계속 언급하지만 모든 것이 객체 타입이다 (7 원시 빼고)

그러나 함수 만큼은 typeof 했을때 function으로 나오지 않는가.

```tsx
typeof {}; // 👉 "object"
typeof []; // 👉 "object"
typeof new Date(); // 👉 "object"
typeof null; // 👉 "object" (버그성 역사)
typeof 123; // 👉 "number"
typeof function () {}; // 👉 "function" ❗️ ← 예외적으로 별도로 취급됨
```

**그럼 typeof function 이녀석을 함수의 타입 지정할때 쓰면 되겠군? → 아니다.**

함수의 타입지정은 매개변수 + 리턴값에 타입 지정함으로써 직접 표현하거나

호출시그니처를 활용 → 함수보다 먼저 (type keyword)로 매개변수와 리턴값에 대한 정보를 주입한다.

직접 표현의 예시

```tsx
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

호출시그니처의 예시

```tsx
// 함수 타입 정의
type GreetFn = (name: string) => string;

// 함수 선언
const greet: GreetFn = (name) => {
  return `Hello, ${name}`;
};
```

실제 상황에서 둘다 자주 쓰이기에 뭐가 더 좋다 라고 말할순 없지만,재사용성은 호출시그니처가 좀 더 좋은편이다.
