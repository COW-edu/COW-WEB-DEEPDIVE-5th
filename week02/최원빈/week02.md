# Enum Type

enum의 속성값은 기본적으로 0,1,2.. 이 순서로 값이 저장된다

만약 enum 속성 값에 인위적으로 값을 추가한다면 0,1,2의 순서를 깨고 추가된 값 기준으로 새로운 순서의 숫자 값을 배정한다.

**Enum Type을 굳이 왜 써야하는가?**

거칠게 말하면, 헷갈리지 않기 위해서이다.

enum Type의 속성값을 주입하고 아래 새로 만들어진 객체의 속성값으로 사용할때, english =’eng’으로 하드코딩하는 것보다,

enum의 속성을 빌려쓰면 훨씬 안정감이 생기기 때문이다.

```tsx
enum Role {
	ADMIN //0
	USER = 3, //3
	GUEST //4
}
enum Language {
  korean = 'kor',
  english = 'eng',
}

const user1 = {
  role: Role.ADMIN,
  language: Language.english,
  // language: 'english' ->  이런 하드코딩보다 enum을 사용하는 것이 안전하다!
}
```

# Any Type & Unknown Type

## Any는 모든 타입을 커버한다.

JS처럼 쓸 수 있는 타입이라고 이해해도 좋다.

### 변수에 Any Type을 지정할 경우.

정말 자유분방한 존재가된다.

```tsx
let anyVar: any = 10;
anyVar = 'hello';
anyVar = true;
anyVar = () => {};
anyVar.toUpperCase(); // 심지어 이것도 가능하다.
```

물론, ts_node로 터미널에서 실행시키면 당연히 오류가 난다. **런타임 에러가 발생하겠다!**

함수에서 어떻게 문자열 전용 메서드가 실행되겠는가.

그러나 vsc 환경에선 오류가 나지 않으므로, TS를 쓴다는 의미가 any type을 사용하므로써 매우 희석될 가능성이 상당하다.

### Unknown Type

Any와 비슷하면서도 다르다.

```tsx
let unknownVar: unknown = 10;
unknownVar = 'hello';
unknownVar = true;
unknownVar = () => {};
unknownVar.toUpperCase(); // 에러 !

// if (typeof unknownvar ==='number') 와 같은 narrowing이 필수요소!
```

즉 unknownType은 any와 비슷하게 유연한 타입이지만,

런타임 에러가 발생할 원인은 제공하지 않기에,

만약 any Type과 같은 유동적인 타입이 필요할때는

unknown type을 선택하는 것이 좀 더 적절하다.

### void Type

void Type은 일반적으로 변수보다는 함수의 리턴 타입에 주로 쓰인다.

변수 자체가 Void하다 라는 표현은 null, undefined로 표현하기 때문이다.

```tsx
function printHello(): void {
  console.log('Hello');
}
```

함수에 리턴타입이 존재하지 않는다. 를 표현하기 위해 주로 쓰이겠다.

### never Type

never Type도 마찬가지로 일반 변수에는 거의 사용되지 않고, void같이 함수의 리턴타입에 많이 쓰인다.

never Type은 이상한 상황에서의 방어막 역할을 맡는다. 즉, 이 함수가 일어날리가 없다를 의미한다.

**“절대 일어나지 말아야 할 코드를 체크한다”**

```tsx
function shouldNeverHappen(value: never) {
  throw new Error(`Unexpected value: ${value}`);
}

function handle(value: 'a' | 'b') {
  if (value === 'a') {
    // 처리
  } else if (value === 'b') {
    // 처리
  } else {
    shouldNeverHappen(value); // 여긴 절대 도달하면 안 됨
  }
}
```

### Array Type

자바스크립트에서는 배열을 따로 배열 단독으로 자료형이라고 취급하지 않는다.

TS에서 따로 타입을 빼둔 이유는 정적 타입 시스템을 구축했기 때문이겠다.

```
typeof [1, 2, 3] // "object"
```

### 자바스크립트 와는 다른 정적 타이핑이 입혀진 배열.

우리가 알다시피 자바스크립트에서 배열은 문자열 숫자 등등 여러 타입의 혼용을 허용했다.

타입을 보수적으로 잡는 타입스크립트에서는 당연히 하나의 타입의 원소만을 배열에 허용하겠다.

### 두 가지 방식

```
const arr : [number] =[1,2,3]
const arr2 :Array<number> = [2,3,4,]
```

### Unioning도 가능하다.

두 예시를 보면 거의 비슷하긴한데 전자는 숫자 배열 또는 문자 배열

후자는 하나의 배열에 여러 타입이 혼용 가능하다 의 의미를 지니겠다.

```
const arr2 :number[] | string[]
const arr3 : (number|string)[]
```

### 투플의 존재

투플은 배열의 idx의 갯수와 타입을 정한 정말 보수적인 배열이라고 이해하면 쉽다.

```
const tuple: [number, string] = [1, 'hello'];
```

이러한 특성떄문에 함수의 리턴값이 고정된 구조를 갖는 경우에 자주 쓰인다.

### 투플에 담기는 옵셔널 프로퍼티 + Rest Params.

매우 보수적인 투플에 약간의 유연성이 더해진

기능 두개를 소개한다.

1. 옵셔널 프로퍼티

지정한 index type뒤에 ?를 붙여 없어도 된다라는 것을 명시해주는것도 가능하다.

1. 나머지 매개변수

**rest parameter (나머지 매개변수)를 활용**하면

: [string,…number[]] 이 뜻은 무엇일까

첫번째 Idx는 String Type이 오고 나머지는

넘버타입의 배열 뭐든 들어와라 겠다.

```
let person: [string, number?];

person = ['Alice'];       // ✅ OK
person = ['Bob', 30];     // ✅ OK
person = [];

const data: [string, ...number[]] = ['합계', 10, 20, 30];            // ❌ Error - 첫 번째 요소는 필수
```

# 심화 1. ) 타입이 왜 집합인가 ?

### 타입 호환성

**Number 타입 vs Number 리터럴 타입**

전자는 직사각형

후자는 정사각형

Number LiteralType은 Number 타입의 부분집합 ( 정사각형) 이다.

### UpCasting & DownCasting

subType (서브타입 리터럴) → SuperType (슈퍼타입)으로 지정하는것.

서브타입을 슈퍼타입으로 보는건 적절하나 ,

그 반대인 DownCasting은 적절하지 않다

```tsx
let num1: number = 10;
let num2: 10 = 10;

num1 = num2; //O
num2 = num1; //X
```

<img width="695" alt="Image" src="https://github.com/user-attachments/assets/38efa28b-267d-49bb-856c-6fe2c6ed8a02" />

# 타입 계층도 파악

<img width="945" alt="Image" src="https://github.com/user-attachments/assets/fdab14dc-0bc5-439b-a32f-61be77c309d5" />

### unknown이 모든 타입의 어머니, 전체 집합이다.

즉 Upcasting을 할 수 있는 은혜로운 타입인 것이다.

만일 숫자변수, 문자열변수, 불리언 변수가 unknown type으로 넣는다면 이것은 Upcasting으로써 가능한 조치이다.

### Upcasting이란?

**“자식 클래스(구체 타입)를 부모 클래스(일반 타입)로 변환하는 것”**

즉, **더 구체적인 타입 → 더 일반적인 타입으로 변환**하는 걸 의미한다.

이게 텍스트로는 매우 헷갈린다( 그 반대 아니야? 싶을수도있지만)

코드 상으로는 명확하게 보일 것이다.

```tsx
let num:number;
let str :string;
let bool :boolean;

let unk :unknown;
unk = 1; //가능
unk = true; //가능
-> upcasting

//그 반대? -> 다운캐스팅
num =unknownVar (x)

```

### Never Type은 모든 타입의 부분집합 타입이다. (공집합)

위의 예시에 이어서

```tsx
let nev: never;

num = nev; //가능
str = nev; //가능 (업캐스팅)

// 그 반대는 다운캐스팅으로 오류가 날 것이다!
nev = num;
```

### 치트키, any타입

Any 타입은 타입 계층을 무시한다.

즉 허용하지 않았던, 다운캐스팅을 허용한다.

**그러나 특수한 타입인 never 타입은 그 어떠한 타입도 다운 캐스팅을 할 수 없다. (역설 방지)**

```tsx
function anyExam() {
  let unknownVar: unknown;
  let anyVar: any;
  let undefinedVar: undefined;
  let neverVar: never;
  anyVar = unknownVar;
  //  다운 캐스팅 해도 문제가 없습니다.

  undefinedVar = anyVar;
  //  다운 캐스팅 해도 문제가 없습니다.

  neverVar = anyVar;
  // 네버 타입에는 그 어떤 타입도 다운 캐스팅 할 수 없습니다.
}
```

# 심화2.) 객체 타입 호환 (Upcasting vs Downcasting)

```tsx
type human = {
  name: string;
  age: number;
};

type wonbin = {
  name: string;
  age: number;
  address: string;
};

let human1: human = {
  name: 'trump',
  age: 10,
};

let wonbin1 = {
  name: 'wb',
  age: 24,
  address: 'seoul',
};

let human2: human;
human2 = wonbin1;

let wonbin2: wonbin;
wonbin2 = human1; //자식타입을 부모타입에 할당하는건 다운캐스팅이니 안되겠다.
```

human type의 속성이 2개가 있고 wonbin type이 속성 3개가 있으니 wonbin type이 superset type이지 않을까?

는 아니다.

공통 속성이 있을때, **속성의 갯수가 적은게 부모 타입이다.**

    **👇 즉, Human ⊃ Wonbin으로 봐야한다.**

**human = wonbin (upcasting)**

**wonbin = human (downcasting)**

**따라서, wonbin2 (부모) = human1(자식)으로 할당하면 오류가 나는 것.**

# Union Type 과 Intersection Type

### 기본 타입간의 Union Type, Intersection Type

기본타입에서는 union Type은 종종 쓰이지만 당연하게도 Intersection Type은 거의 쓰이지 않는다.

당연한게 문자열이며, 숫자인 값이 어디있겠는가.

그러나 둘 중 하나 혹은 셋 중 하나… 는 쓰일만 하다.

```tsx
type StringOrNumber = string | number;

let val1: StringOrNumber = 'hello'; // ✅
let val2: StringOrNumber = 123; // ✅
let val3: StringOrNumber = true; // ❌
```

### 기본 타입간의 유니온은 특히 함수 매개변수 타입 지정에서 많이쓰인다.

### 객체 타입간의 Union Type , Intersection Type

```tsx
type first = {
  name: string;
  age: number;
};

type second = {
  name: string;
  height: number;
};

type union = first | second;

let union1: union = {
  name: 'hi',
  age: 23,
};

let union2: union = {
  name: 'hi',
  height: 17,
};

let union3: union = {
  name: 'hi',
  height: 173,
  age: 23,
};
let union4: union = {
  age: 19,
};

type intersection = first & second;
type unionIntersect = {
  name: 'hi';
  age: 23;
  height: 188;
};
```

# 타입스크립트의 기본적인 타입 추론

### 타입을 굳이 선언하지 않아도 타입스크립트에서 자동으로 타입을 추론해준다.

```tsx
let str = 'hello'; // string
let num = 42; // number
let isDone = true; // boolean

function sum(a: number, b: number) {
  return a + b; // 리턴 타입도 자동으로 number로 추론됨
}
```

# 관계가 있는 타입 간의 타입 단언 (type assertion)

```tsx
let value: unknown;
value = 42;

let num1 = value as number; // 가능 (unknown → number: upcasting)
let str1 = value as string; // 가능하지만 위험 (런타임 오류 가능)

let text = 'hello';
let asNumber = text as number; // ❌ 컴파일은 되지만, 비정상적인 단언
```

왜 unknown이 타입 단언하는 것은 되고, 일반적인 기본타입이 되는 것은 작동하지 않을까?

쉽게 말하면, 타입간의 관계가 없기 때문이다.

위의 타입 계층도에서 unknown은 모든 타입의 슈퍼셋이며, 나머지 Number , string은 subset이기에 .

집합의 관점에서 Upcasting이니 가능하다.

text - Number은 관계가 존재하지 않으니 당연히 비정상적인 단언이라고 인식한다.

# 유니언 서로소 타입 x TypeGuard

서로소 유니온 타입은 여러 타입을 union으로 묶고, 각 타입을 구별할 수 있는 공통된 식별자를 포함하는 방식입니다.

### 타입을 굳이 여러개로 쪼개야하는 이유?

“다른 상황, 다른 데이터 구조를 정확하게 표현하기 위해서” 라고 이해하는게 좋습니다.

**→ 정확한 모델링과 안전한 분기 처리**

### 상황별로 구조가 달라질 경우

프론트엔드에서 필연적으로 하는 API 연동의 경우, 상황별로 처리하는 데이터 구조가 달라집니다.

```tsx
type Success = {
  type: 'success';
  data: User[];
};

type Error = {
  type: 'error';
  message: string;
};

type Response = Success | Error;
```

api 연동이 성공했다면 성공하거나, 실패하거나 할 것이다.

하나의 타입으로 모든 처리를 뭉뚱그려 할 경우, 두 필드를 선택적으로 만들어야한다.

### 필드가 선택적이라는 것은 무엇인가?

```tsx
type BadResponse = {
  type: 'success' | 'error';
  data?: User[];
  message?: string;
};
```

하나의 타입에서 선택적으로 어떤 속성은 가져와야하고, 어떤 속성은 가져오면 안될경우

즉. 서로 다른 경우에만 존재해야하는 경우 같은 타입에 둔다면 TS 입장에서는 정확한 판단이 어렵다.

### 정확한 분기처리가 가능하다.

우리가 깃허브에서 분기를 따로 파거나 하는 이유는 무엇인가? 정확도를 위해서다.

마치 그런 것 처럼, 정확한 분기처리를 위해 분기 처리할 타입을 따로만들고, 조건에 따라 가져와하는 타입을 공통된 식별자 (type 속성)을 활용해서 안전하게 가져오자는 것.

아래처럼 조건문으로 공통된 속성을 기준으로 타입을 구별하는 것을 TypeGuard라고 한다.

```tsx
function dataFectch(res: Response): void {
  if (res.type === 'success') {
    console.log(res.data); // 성공할 경우
  } else {
    console.log(res.message); // 실패할 경우
  }
}
```

# Type Narrowing 소개

### 유니온 타입이 함수의 매개변수의 타입이 될 경우

개발자 입장에서는 어떤 타입을 예상하고 대비하지만, TS에서는 그렇지 못할것이다.

TS가 코드를 읽어서 자바스크립트로 보내줘야하는데, 이 과정에서 TS는 매개변수에 타입을 확실하게 파악하지 않고 보낼 수가 없다는 것이다.

```tsx
function printValue(value: string | number) {
  console.log(value.toUpperCase()); // Error: number일 수도 있으니까!
}
```

### 타입가드의 활용 (typeOf, InstanceOf, key in Obj)

원시타입의 경우는 당연히 typeOf으로 해결된다.

그러나, Date 인스턴스같이 JS내부의 클래스 부산물, 즉 인스턴스면 typeOf로 정확한 타입을 판단할 수 없다.

이때는 InstanceOf를 활용하여 인스턴스 타입을 확인한다.

여기까지는 쉽다

### type alias의 type guarding

그렇다면 type alias (Type Keyword or Interface Keyword)일때는 어떻게 타입가드를 할까?

타입 별칭은 런타임에 존재하지 않는다. (사설 타입)

**사실 우리가 인위적으로 생성하는 타입 키워드인것이다. 런타임에선 아무런 실체가 없다!**

1.  typeof → 런타임에서 행해지는 타입 검증이다.

그러나 타입별칭은 애초에 런타임에 존재하지 않는다. 컴파일 타임에만 존재한다.

시간순서적으로 컴파일 (TS - JS로 변경)→ 런타임 (JS → 브라우저렌더링)이니 당연히 typeOf가 타입 별칭에 먹힐리가 없겠다.

1. InstanceOf → 클래스의 부산물 객체에만 사용할 수있다.

InstanceOf는 물론, 런타임에 실행되긴 하다만, 런타임에서 클래스의 type은 function()으로 되어있다. ( constructor) 따라서 타입별칭과는 관계가 없다.

1. key in Obj → 타입 별칭이 매개변수로 들어올때 타입 가드로 활용 가능.

```tsx
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function animal(args: Dog | Cat) {
  if ('bark' in args) args.bark();
  else args.meow();
}
```

### 위의 내용을 종합하면..

```tsx
type Person = {
  name: string;
  age: number;
};

function handleValue(value: string | number | Date | Person) {
  if (typeof value === 'string') {
    console.log('문자열 길이:', value.length);
  } else if (typeof value === 'number') {
    console.log('2배 숫자:', value * 2);
  } else if (value instanceof Date) {
    console.log('연도:', value.getFullYear());
  } else if ('name' in value) {
    console.log('사람 이름:', value.name);
  } else {
    console.log('알 수 없는 타입');
  }
}
```

### 주의해야할 점 (typeOf null)

null의 type은 무엇일까?

null은 typeOf로 검증할때는 객체 타입이라고 나오며, instanceOf로 검증할때는 객체가 아니라 나오는 참으로 애매모호한 친구이다.

### ‘key’ in Null 하면 런타임 오류난다.

함수에 매개변수로 null이 들어올 가능성이 제로라고 확신할 수 있는가?

그래서 타입가드를 할때 특히 타입 별칭을 가드를 할때, 매개변수로 들어올 값의 null 방지 조건을 추가하라는 것.

또한 typeOf x === ‘object’까지 쓰면 원시타입도 필터링 되기에, 정말 객체들만 거를 수가 있는 것,

```tsx
typeof null === 'object';
null instanceof Object === false;

type Person = {
  name: string;
  age: number;
};

function isPerson(x: any): x is Person {
  return 'name' in x; // ❌ x가 null이면 여기서 에러남!
} //이거 말고

function isPerson(x: any): x is Person {
  return x !== null && typeof x === 'object' && 'name' in x;
} //이게 젤 안전
```

# 함수 타입

### 함수 타입 표현식 → 변수 혹은 타입 별칭으로 타입을 직접 지정할때

간혹 이걸 호출 시그니처라고 오해하던데, 그러면 안된다.

사칙연산의 기능을 하는 네가지 함수를 만든다고 가정하면, 이 함수의 매개변수와 리턴타입은 명확하게 Number 일 것이다. 우리가 함수를 타입스크립트로 구현하면 매개변수와 리턴타입에 타입을 명시해줬는데 이 4가지 연산은 모두 동일한 타입이다.

**즉, 네가지 함수를 구현하려면 동일한 타입 지정을 불필요하게 많이 해야한다는 것이다.**

그걸 방지하는것이 함수 타입 표현식이다.

**함수표현식은 오직 화살표함수로만 써야한다는 것을 잊지말자.**

```tsx
type operation = (a:number,b:number) => number;

const add :operation =(a,b) => a+b;
const minuse :operation = (a,b) => a-b;
...

```

### 호출 시그니처 → “함수처럼 생긴 객체”

호출 시그니처는 함수 타입 표현식과 유사한 개념이지만, 함수의 타입을 객체처럼 표현하자는 것이다.

여기서 description이라는 함수 타입과 무관한 다른 호출시그니처의 속성까지 접근하려면

호출 시그니처 타입의 객체에 Object.assgin()을 해줘야한다만 굳이 이렇게까지 쓰는건 좋지않을듯하다.

```tsx
type OperationWithMeta = {
  (a: number, b: number): number;
  description: string;
};

const add: OperationWithMeta = Object.assign((a: number, b: number) => a + b, {
  description: '두 수를 더합니다.',
});

console.log(add(2, 3)); // 5ㅌ
console.log(add.description); // "두 수를 더합니다."
```

### 함수의 오버로딩 시그니처

말은 어렵지만 쉽게 말하면 같은 이름의 함수를 여러개 쓸 수 있다는 것이다.

만약 같은 함수의 작동을 하나의 매개변수, 혹은 두개의 매개변수 혹은 아예 없게 끔 유동적으로 함수를 쓰고 싶다면?

**오버로딩할 함수의 시그니처를 만들때는 반드시, function 을 써야한다. type이 아니라!**

```tsx
// 오버로드 시그니처 (TS에게 알려주는 타입들)
function greet(): string;
function greet(name: string): string;
function greet(age: number): string;
function greet(name: string, age: number): string;

// 실제 구현 (JS처럼 작성해야 함)
function greet(a?: string | number, b?: number): string {
  if (typeof a === 'string' && typeof b === 'number') {
    return `안녕하세요, ${a}님. 당신은 ${b}살이군요.`;
  }
  if (typeof a === 'string') {
    return `안녕하세요, ${a}님!`;
  }
  if (typeof a === 'number') {
    return `당신은 ${a}살이군요.`;
  }
  return '안녕하세요!';
}

// 사용 예시
greet(); // "안녕하세요!"
greet('민수'); // "안녕하세요, 민수님!"
greet(25); // "당신은 25살이군요."
greet('지우', 30); // "안녕하세요, 지우님. 당신은 30살이군요."
```

## 인덱스 시그니처 (key / Value) 속성 지정해주기.

인덱스 시그니처는 특정 타입의 속성 이름은 알 수 없지만 속성값의 타입을 알고 싶을 때 사용한다.

### 어디? Type alias or Interface

인터페이스 내부에 `[key: K]: T`꼴로 타입을 명시해주면 된다. 이는 해당 타입의 속성 키는 모두 K타입이며 value는 T타입을 가져야 한다는 의미다.

```tsx
// 기본 형태
interface IndexSignatureEx {
  [key: string]: number; // key의 이름은 문자열, value는 숫자형
}
```

### 왜 ?

쉽게말하면 객체에 올수있는 속성( key + value)쌍에 올수있는 타입들은 다양하다.

```tsx
type NumMap = {
  [key: string]: number;
};

const scores: NumMap = {
  math: 90,
  english: 85,
  // science: "good" // ❌ Error
};
```

그걸 강제해주기 위한 것. (즉 객체에 아무키나 올수있는게 아니다) 를 강제.

## 템플릿 리터럴 타입

### 문자열 조작을 타입수준에서 하고싶다.

js의 템플릿 문자열 과 비슷하면서도 다르다.

js에서 우리가 흔하게 썼던 그 템플릿 내부에 타입을 넣어주는 것이다!

```tsx
type Hello = `hello ${string}`;
```

Hello라는 타입은 문자열 이며 hello 뒤에 어떤 문자열의 값이 들어올수 있다.

```tsx
const greeting1: Hello = 'hello world'; // ✅ OK
const greeting2: Hello = 'hello123'; // ✅ OK
const greeting3: Hello = 'hi world'; // ❌ Error
```

### 실제 사용 예시

템플릿 내부에 타입을 넣으라했다. 그 타입은 당연히 별칭으로 따로 지정해준것도 가능하겠다.

리터럴 타입으로 타입에 들어올 문자열만을 강제하고, 그 문자열들의 배치또한 강제하면, 더욱 더 안정적으로 쓰겠다.

```tsx
type Method = 'get' | 'post' | 'put';
type Entity = 'user' | 'product';

type APIKey = `${Method}_${Entity}`;
// "get_user" | "post_user" | "put_user" | "get_product" | ...
```

# 제네릭

## 제네릭의 정의 (타입 변수를 활용하자)

- 제네릭은 C나 자바같은 정적언어에서 다양한 타입간의 재사용성을 높이기 위해 사용하는 문법이다. 타입스크립트도 정적언어로서 제네릭 문법을 지원한다.
- 타입 변수를 사용해서 해당 위치를 비워 둔 다음에 그 값을 사용할 때 **외부에서** 타입 변수자리에 **타입을 지정**하여 사용하는 방식으로 사용한다.
- 타입 변수는 일반적으로 `<T>`와 같이 꺾쇠괄호 내부에 정의되며 사용할 때 함수에 매개변수를 넣는 것과 유사하게 원하는 타입을 넣으면 된다.

### 일반화되어 확장 가능한 타입

```tsx
function identity<T>(arg: T): T {
  return arg;
}
```

### 문제발생

```tsx
function printLength<T>(arg: T): number {
  return arg.length; // ❌ Error!
}
```

T가 어떤 타입인줄 알고 length를 붙이니? 의 오류이다.

## 이때 제약 조건을 만들어서 건다.

예를들어 length라는 특성이 필요하다면?

```tsx
interface TypeWithLength {
  length: number;
}

function exampleFunc<T extends TypeWithLength>(arg: T): number {
  return arg.length; // ✅ OK
}
```

T는 최소 TypewithLenght 인터페이스의 속성, 즉 Length: number 조건이있어야한다. 라는 걸 명시해준것이다.

# 제네릭의 활용법

## 함수의 제네릭

함수의 매개변수, 리턴 값에 다양한 타입을 넣고 싶을때 사용한다.

<T>를 활용해 T자리에 선언할때 타입에 따라 적절하게 사용한다.

```tsx
function ReadOnlyRepository<T>(
  target: ObjectType<T> | EntitySchema<T> | string
): Repository<T> {
  return getConnection('ro').getRepository(target);
}
```

### 호출 시그니처 의 제네릭 → 함수의 타입을 객체처럼 표현하는 것.

```tsx
export type UserRequestHookType = <RequestData = void, ResponseData = void>(
  baseURL?: string | Headers,
  defaultHeader?: Headers
) => [RequestStatus, Requester<RequestData, ResponseData>];

const defaultHeader: Headers = { header: 'header' };
userRequestFunction<string, number>('baseURL', defaultHeader);
```

매우 복잡해보이지만, 호출시그니처란 함수의 타입을 객체처럼 표현한 것이다.

UserRequestHookType으로 호출시그니처를 지정하여 함수를 호출할때 제네릭으로 구체적인 타입을 명시하면 된다.

위의 호출시그니처를 좀 분석해보면 두가지 타입을 매개변수타입으로 받고, 두개의 속성을 지닌다.

즉 저 호출시그니처를 타입으로 활용할 함수는 두가지 타입 매개변수와 두가지 속성을 함수 매개변수로 받는다.

```tsx
type Logger = {
  (message: string): void; // 호출 시그니처
  level: 'info' | 'warn' | 'error'; // 속성
};

const myLogger: Logger = Object.assign(
  (msg: string) => {
    console.log(`[${myLogger.level}] ${msg}`);
  },
  { level: 'info' } // 👉 속성 붙이기
);

myLogger('서버가 시작됨!'); // [info] 서버가 시작됨!
```

### 제네릭 클래스

외부에서 입력된 타입을 클래스 내부에 적용할 수 있는 클래스다.

```tsx
class Pair<T, U> {
  private first: T;
  private second: U;

  constructor(first: T, second: U) {
    this.first = first;
    this.second = second;
  }

  getFirst(): T {
    return this.first;
  }

  getSecond(): U {
    return this.second;
  }

  setFirst(value: T): void {
    this.first = value;
  }

  setSecond(value: U): void {
    this.second = value;
  }
}

const numberAndStringPair = new Pair<number, string>(10, 'Hello');
```

위의 Pair 클래스의 타입 매개변수 T,U는 클래스 내부에서 현재 활용되고있다.

클래스가 인스턴스를 만들때, T,U와 같은 클래스 내부 매개변수가 실제 인스턴스의 매개변수로 쓰인다.

즉, 인스턴스가 타입을 선언하며 만들어질때 그 선언된 타입은 클래스 내부에서  `<T>`는 number로, `<U>`는 string로 대체되어 클래스에서는 실제 타입을 다루는 효과가 나타나겠다.

## 제네릭은 무조건 좋은가?

말그대로 코드의 효율적 재사용이다.

제네릭의 장점은 다양한 타입을 받게 함으로써 코드를 효율적으로 재사용할 수 있는 것이다.

### 생각해봐야할점 3가지.

제네릭을 굳이 사용하지 않아도 되는 타입에 사용한다거나, any를 활용한다거나, 가독성을 고려하지 않고 쓴다면 크게 의미가 없는 코드가 될 가능성 있어 경계를 해야한다.
