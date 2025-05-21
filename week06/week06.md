# Review

### 1. Index Access Type

```tsx
interface User {
  id: number;
  name: string;
  isAdmin: boolean;
}

type UserId = User['id']; // number
type UserName = User['name']; // string
```

- 특정 속성의 타입만 추출하고 싶을 때 사용
- 문자열 리터럴을 key로 사용함

---

### 2. key Of 연산자

```tsx
interface User {
  id: number;
  name: string;
  isAdmin: boolean;
}

type UserKeys = keyof User; // "id" | "name" | "isAdmin"
```

- 객체 타입의 키 집합을 유니온 타입으로 반환한다.

---

### 3. Mapped Type

```tsx
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};
```

- 객체의 모든 키를 순회 (mapping한다고 생각)하며 새로운 타입 생성
- 위 예시는 모든 속성을 readonly로 만듦

```tsx
type NullableUser = {
  [K in keyof User]: User[K] | null;
};
```

- 모든 필드를 nullable 처리

---

### 🔹 4. Template Literal Type

```tsx
type Lang = 'en' | 'ko';
type Direction = 'next' | 'prev';

type MessageKey = `${Lang}_${Direction}`;
// 결과: "en_next" | "en_prev" | "ko_next" | "ko_prev"
```

- 타입간의 카타시안 곱의 느낌을 하기 위한 도구
- 자바스크립트에서 썼던 템플릿 리터럴의 방식을 차용한다.
- 타입 두개를 ConCat하는 방식으로, 새로운 타입을 만든다.

---

### 5. 혼합해보자

```tsx
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface Post {
  id: number;
  title: string;
}

//흔하게 API 통신을 할때 우리가 보는 데이터 구조이다.
//Post가 우리가 이해하는 그 data의 타입인 것.
type PostResponse = ApiResponse<Post>;

// 필드별 응답 메타 정보 만들기
interface FieldMeta {
  label: string;
  visible: boolean;
}

//PostFieldMeta라는 타입은 key는 Post의 key (id, title)을 가지고,
//Value에는 FieldMeta의 타입을 갖기에
type PostFieldMeta = {
  [K in keyof Post]: FieldMeta;
};

//예시 데이터 (PostFieldMeta) 객체 타입
const postMeta: PostFieldMeta = {
  id: { label: 'Post ID', visible: true },
  title: { label: 'Title of Post', visible: true },
};
```

---

# #2. 조건부 타입

## 2.1 삼항연산자를 활용하여 조건에 따라 타입을 부여하는 것이 기본

```tsx
type A = number extends string ? string : number;
//A
```

타입의 Extend 관계를 파악할때는 타입의 집합관계를 따진다고 처음부터 얘기했었다.

number type과 string type은 동등한 위치의 집합관계이게 extends 하지않는다.

a 타입이 b 타입을 extend 하려면 b타입이 a 타입보다 슈퍼타입이어야 한다.

### 2.2 타입의 위계질서(집합관계)

| number extends string                          | number는 string에 할당 불가             | ❌ false       |
| ---------------------------------------------- | --------------------------------------- | -------------- |
| "hello" extends string                         | 문자열 리터럴 "hello"는 string에 포함됨 | ✅ true        |
| { a: number } extends object                   | 객체는 object의 부분집합                | ✅ true        |
| { a: number; b: string } extends { a: number } | 속성이 더 많은 쪽이 작은 집합           | ✅ true        |
| any extends string                             | any는 모든 타입을 포함하는 특수 타입    | ✅ true (주의) |
| never extends T (모든 T에 대해)                | never는 공집합이므로 항상 서브타입      | ✅ true        |

**주의할점 1. 객체에서는 속성이 많은 쪽이 서브타입이다. (오히려 속성이 적은게 슈퍼타입)**

**주의할점 2. any는 모든 타입을 다 포함한다. (자웅동체같은 타입) 모든 타입의 슈퍼타입이자 서브타입**

**주의할점 3. never는 모든 타입의 서브타입, unknown은 모든 타입의 슈퍼타입이다.**

**주의할점 4. 모든 리터럴 타입은 그 해당 타입의 서브타입이다.**

### 2.3. 조건부 타입은 제네릭과 함께 사용하는게 좋다.

제네릭으로 가변성을 더 추가하는 것

```tsx
type StringNumberSwitch <T> = T extends number ? string;
let varA :StringNumberSwitch<number>
let varB :StringNumberSwitch<string>
```

### 2.4. TS 함수 오버로딩

TS의 런타임에는 오직 런타임에는 오직 하나의 함수만 존재해야한다.

여러 내가 선언한 오버로드 시그니처는 **전부 타입스크립트 컴파일러를 위한 보조 도구.**

즉 컴파일 타임의 타입검사 정도의 보조도구다.

자바의 함수 오버로딩과는 전혀 다른게 자바에선 동명의 함수 여러개가 런타임에 동시에 존재하기 때문이다.

```tsx
function removeSpace(text :string | undefined | null){
	return text.replaceAll(' ','');
}
//오류 발생! (undefined, null)은 text method를 사용할 수 없으니까
//좁히기 + as any로 단언해야한다.

//오버로딩
function removeSpace<T> (text :T) : T extends string ? string : undefined
function removeSpace(text :string | undefined | null){
		if(typeof text ==='string) return text.replaceAll(" ", "")
		else return undefined
	return text.replaceAll(' ','');
}
```

### 2.5. 분산적인 조건부 타입

제네릭에다가 유니온타입을 주입한다면 어떻게 동작할까?
이 유니온 타입이 통으로 들어가는게 아니라, 각 유니온으로 묶인 타입이 분배되어 들어간다

1. number 이 T로 들어감 (True 니까 number)
2. string 이 T로 들어감 (false 니까 string)

따라서, 두개가 묶이므로 결과적으로 number | string으로 들어가는것

쉽게 표현하면 유니온으로 묶인 타입이 T extends라는 조건식에 들어갈 경우, 이를 분배법칙처럼 타입 하나하나 씩을 추출 한 후 , 조건 검사를 한다고 생각하면 쉽다.

```tsx
type StringNumberSwitch<T> = T extends number ? string : number;

let c: StringNumberSwitch<number | string>;

let d: StringNumberSwitch<number | string | boolean>;

type ExtractU<T, U> = T extends U ? T : never;
type B = Extract<number | string | boolean, string>;
```

실제 활용사례
Extract (타입을 추출) 매개변수 U에 해당하는 타입만 추출하고 싶을때

위처럼 코드를 짜면, U 두번째 제네릭 매개변수 타입만을 추출 할 수 있다.

# #3. 유틸리티 타입

## 3.1. 맵드 타입 기반의 유틸리티 타입 - Partial<T>

부분적인 타입 (특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 바꿔주는 타입이다.

맵드 타입은 뭘까? 객체 타입의 모든 속성을 순회하면서, 각 속성의 타입을 변형하거나 새로운 타입을 만들 수 있게하는 문법이다.

```tsx
interface Post {
  title: string;
  tags: string;
  content: string;
  thumbnail: string;
}

type Partial2<T> = {
  //optional 연산자
  [key in keyof T]?: T[key];
};
//객체 속성을 전부 갖을 수 없다면 아직 (일단 미완성으로 두는것)
const proto1: Partial2<Post> = {
  title: '아직 미완성',
  content: '초안.. 임시 저장본',
};
```

### 3.1.2. 맵드 타입 기반의 유틸리티 타입 - Required<T>

Partial과 반대로 모든 속성을 다 기입해야한다.

```tsx
interface Post {
  title: string;
  tags: string;
  content: string;
  thumbnail: string;
}

type Required2<T> = {
  [key in keyof T]: T[key];
};
//객체 속성을 전부 갖을 수 없다면 아직 (일단 미완성으로 두는것)
const proto2: Required2<Post> = {
  title: '아직 미완성',
  content: '초안.. 임시 저장본',
  tags: '2',
  thumbnail: '썸네일임 ',
};
```

### 3.1.3. 맵드 타입 기반의 유틸리티 타입 - ReadOnly<T>

```tsx
interface Post {
  title: string;
  tags: string;
  content: string;
  thumbnail: string;
}

type ReadOnly2<T> = {
  //mapped type
  readonly [key in keyof T]?: T[key];
};

const proto3: ReadOnly2<Post> = {
  title: '아직 미완성',
  content: '초안.. 임시 저장본',
  tags: '1',
  thumbnail: 'hi',
};

proto3.content = 'asdf'; //Error!
```

### 3.1.4. 맵드 타입 기반의 유틸리티 타입 - Pick<T,K>

객체 타입으로 부터 특정 프로퍼티만 딱 골라내는 기능을 제공하는 유틸리티 타입.

```tsx
interface Post {
  title: string;
  tags: string;
  content: string;
  thumbnail: string;
}
//객체 타입으로 부터 특정 프로퍼티만 딱 골라내는 기능
type Pick2<T, K extends keyof T> = {
  [key in K]: T[key];
};

//객체 속성을 전부 갖을 수 없다면 아직 (일단 미완성으로 두는것)
const legacyPost: Pick2<Post, 'title' | 'content'> = {
  title: '옛날 글',
  content: '어쩌구',
};

//쉽게말하면, Pick은 Post(본래 인터페이스 객체에서)
//두번째 매개변수로 인터페이스 객체 내 부분적인 속성 몇개를 추출하자의 의미를 지닌다.
```

### 3.1.5. 맵드 타입 기반의 유틸리티 타입 - Omit<T,K>

Pick 유틸리티 함수와 의미론적 반대의 의미를 지닌다.

특정 객체 프로퍼티에서 어떤 프로퍼티를 딱 제외 시키는 것.

```tsx
interface Post {
  title: string;
  tags: string;
  content: string;
  thumbnail: string;
}
//객체 타입으로 부터 특정 프로퍼티만 딱 제외시키는 기능이다.

const legacyPostOmit: Omit<Post, 'title'> = {
  tags: 'ji',
  content: '1234',
  thumbnail: '12',
};
```

### 3.1.6. 맵드 타입 기반의 유틸리티 타입 - Record<T,V>

Record 유틸리티 타입의 첫번째 매개변수에는 내가 객체의 속성명을 (key) 주입하고,

두번째 매개변수에는 Value를 주입하여, 마치 객체 타입 공장같은 타입 지정 방식을 제공하는 타입이다.

```tsx
//Record 유틸리티 타입은 타입에 객체형태로 추가한다.
//첫번째 변수 : 우리가 만들 객체의 속성

// 두번째 변수  : value

type Thumbnail = Record<"large"|"medium",{values : string}>{

}

//Thumbnail Type = large : {values : string}, medium : {values : string;}
```

### 3.1.7. 조건부 타입 기반의 유틸리티 타입 - Exclude, Extract <T,U>

T에서 U를 제외한다. 혹은 T에서 U를 추출한다.

웬마

```tsx
type A = Exclude<String | boolean, boolean>;

type B2 = Extract<String | boolean, boolean>;

type T1 = Exclude<number, string>; // number (string이 없으므로 그대로 유지)
type T2 = Extract<number, string>; // never (겹치는 게 없으므로 제거됨)
```

# #4. 타입스크립트 컴파일

## 4.1. 런타임과 컴파일타임에 대하여

개발자는 알다시피, 프로그램을 만들기 위해 소스코드를 작성한다. 소스코드는 컴파일러에 의해 기계어 코드로 변환되고, 실행이 가능한 프로그램이 된다.

기계어 코드로 변환되는 이 단계의 시간을 컴파일 타임이라고 한다.

즉, 소스코드가 컴파일 과정을 거쳐 컴퓨터가 이해할 수 있는 기계어 코드(이진수 코드로 )변환 되는 시간대인 것이다.

컴파일 타임이 끝나고나면, 프로그램이 메모리에 적재되어 실행되는데, 이 실행 시간을 런타임이라고 한다.

즉 컴파일타임 → 런타임의 흐름으로 이루어지는 것이다.

자바스크립트는 런타임에 실행된다. 반면 타입스크립트는 어떨까?

타입스크립트는 tsc라고 불리는 컴파일러를 통해 자바스크립트 코드로 변환된다.

tsc (typescript compiler)는 소스코드를 해석한 후 AST (추상 구문 트리)를 만든다.

그 이후 타입 확인을 거친 다음, 결과 코드를 생성한다.

1. 타입스크립트 소스코드를 타입스크립트 AST로 만든다 (컴파일)
2. 타입 검사기가 타입 확인 (컴파일)
3. 타입스크립트 AST를 자바스크립트로 변환한다. (컴파일)
4. 자바스크립트 소스코드를 자바스크립트 AST로 변환 (런)
5. AST가 바이트 코드(기계어)로 변환 (런)
6. 런타임에서 바이트 코드가 평가되어 프로그램이 실행 (런)

위의 과정에서 우리가 알 수 있는 것은, 타입스크립트의 소스코드는 최종적으로 실행되는 프로그램에는 아무런 영향을 주지 않는다는 것이다.

다르게 말하면, 타입스크립트는 컴파일타임에 타입을 검사하기 때문에 에러가 발생하면 프로그램이 실행되지 않겠다. 프로그램이 만들어지기 전 즉, 컴파일 타임에 에러를 발견하기에 정적 타입 검사기라고도 불린다.

### 4.2. TSC의 오류 검출 방식

타입스크립트는 컴파일타임에 아주 엄격하게 문법 에러와 타입 관련 에러를 모두 검출한다.

```tsx
const developer = {
  work() {
    console.log('working...');
  },
};

developer.work(); // working...
developer.sleep(); // TypeError: developer.sleep is not a function
```

위 코드를 자바스크립트의 관점에서 관찰한다면, 코드 작성시에는 아무런 오류가 나지 않는다.

그러나 실행하면 TypeError! 이게 뜬다는 것이다.

```tsx
const developer = {
  work() {
    console.log('working...');
  },
};

developer.work(); // working...
developer.sleep(); // Property ‘sleep’ does not exist on type ‘{ work(): void;}’
```

다시 타입스크립트의 관점에서 바라보자. 코드 작성시 부터 아래 오류가 뜬다.

developer라는 라는 객체게 sleep이라는 속성이 없다는 것.

즉 코드가 실행되기전에 사전에 에러를 발생시키는 것.

### 4.3. 코드 변환기로써의 TSC

```tsx
type Fruit = 'banana' | 'watermelon' | 'orange' | 'apple' | 'kiwi' | 'mango';

const fruitBox: Fruit[] = ['banana', 'apple', 'mango'];

const welcome = (name: string) => {
  console.log(`hi! ${name} :)`);
};
```

타입스크립트의 컴파일러가 자바스크립트 소스코드로 변환하겠다. (트랜스파일)

```tsx
'use strict';

var fruitBox = ['banana', 'apple', 'mango'];

var welcome = function (name) {
  console.log('hi! '.concat(name, ' :)'));
};
```

먼저, 자바스크립트 코드로 변환되는 과정은 타입 검사와 독립적으로 진행된다.

타입 검사 이후, 코드 변환을 한다고 생각해야한다.

자바스크립트는 타입정보를 이해하지 못하기때문에 타입스크립트 소스코드에 타입 에러가 있더라도 자바스크립트로 컴파일되어 타입 정보가 모두 제거된 후에는 타입이 아무런 효력을 발휘하지 못한다고 생각해도 좋다.

### 4.4. 우리가 그토록 썼던 타입가드

```tsx
interface Square {
  width: number;
}

interface Rectangle extends Square {
  height: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    // ‘Rectangle’ only refers to a type, but is being used as a value here
    // Property ‘height’ does not exist on type ‘Shape’
    // Property ‘height’ does not exist on type ‘Square’
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}
```

위의 예시를 보자.

먼저  `Square`와 `Rectangle`은 인터페이스로, 타입스크립트에서만 존재한다.

따라서 `instanceof` 같은 런타임 체크에 사용될 수 없다.

instanceof은 자바스크립트 문법이기 때문이다.

**`instanceof` 체크는 런타임에 실행되지만 `Rectangle`은 타입이기 때문에 자바스크립트 런타임은 해당 코드를 이해하지 못한다.**

따라서, 타입스크립트를 활용하는 우리는 기본 타입 분기 (string or number)

```tsx
function print(value: string | number) {
  if (typeof value === 'string') {
    // 여기서 value는 string으로 좁혀짐
    console.log(value.toUpperCase());
  }
}
```

혹은 class 기반 객체 분기

```tsx
class Animal {}
class Dog extends Animal {}

function handleAnimal(a: Animal) {
  if (a instanceof Dog) {
    // a는 Dog로 좁혀짐
  }
}
```

를 제외하면 안전한 타입가드 (사용자 정의)의 방식을 써야한다는 것이다.

위의 Rectangle interface예시도 위에 해당되지 않으니, 아래와 같이 사용자 타입 가드 함수를 만들어주는 것이다.

shape이 Rectangle intefafce라면, 'height' in shape; 얘에 대한 값을 리턴

```tsx
interface Square {
  width: number;
}

interface Rectangle extends Square {
  height: number;
}

type Shape = Square | Rectangle;

function isRectangle(shape: Shape): shape is Rectangle {
  return 'height' in shape;
}

function calculateArea(shape: Shape) {
  if (isRectangle(shape)) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}
```

### 4.5. TSC의 구조

컴파일러는 하나의 프로그램으로 이를 구현한 소스 파일이 존재한다.

타입스크립트 컴파일러는 tsc 명령어로 실행되며, 컴파일러는 `tsconfig.json`에 명시된 컴파일 옵션을 기반으로 컴파일을 수행한다.

- 프로그램

먼저 전체적인 컴파일 과정을 관리하는 프로그램 객체(인스턴스)가 생성된다. 이 프로그램 객체는 컴파일할 타입스크립트 소스 파일과 소스 파일 내에서 임포트된 파일을 불러오는데, 가장 최초로 불러온 파일을 기준으로 컴파일 과정이 시작된다.

- 스캐너

타입스크립트 소스코드를 작은 단위로 나누어 의미 있는 토큰으로 변환하는 작업을 수행한다.

- 파서

스캐너가 만들어준 토큰의 토큰 정보를 이용하여 AST를 생성한다.

AST는 컴파일러가 동작하는 데 핵심 기반이 되는 자료 구조로, 소스코드의 구조를 트리 형태로 표현하다. AST의 최상위 노드는 타입스크립트 소스 파일이며, 최하위 노드는 파일의 끝 지점으로 구성된다.

스캐너가 어휘적 분석을 통해 토큰 단위로 소스코드를 나눈다면, 파서는 이렇게 생성된 토큰 목록을 활용하여 구문적 분석을 수행한다고 볼 수 있으며 이를 통해 코드의 실질적인 구조를 노드 단위의 트리 형태로 표현하는 것이다.

- 바인더

바인더의 주요 역할은 체커 단계에서 타입 검사를 할 수 있도록 기반을 마련하는 것이다.

바인더는 타입 검사를 위해 심볼이라는 데이터 구조를 생성한다. 심볼은 이전 단계의 AST에서 선언된 타입의 노드 정보를 저장한다.

- 체커

체커는 파서가 생성한 AST와 바인더가 생성한 심볼을 활용하여 타입 검사를 수행한다. 이 단계에서 체커의 소스 크기는 파서의 소스 크기보다 매우 크며, 전체 컴파일 과정에서 타입 검사가 차지하는 비중이 크다는 것을 짐작할 수 있다.

체커의 주요 역할은 AST의 노드를 탐색하면서 심볼 정보를 불러와 주어진 소스 파일에 대해 타입 검사를 진행하는 것이다.

체커의 타입 검사는 다음 컴파일 단계인 이미터에서 실행된다.

**이미터(Emitter)**

이미터는 타입스크립트 소스를 자바스크립트(js) 파일과 타입 선언 파일(d.ts)로 생성한다.

이미터는 타입스크립트 소스 파일을 변환하는 과정에서 개발자가 설정한 타입스크립트 설정 파일을 읽어오고, 체커를 통해 코드에 대한 타입 검증 정보를 가져온다.

- 총 정리

1. tsc 명령어를 실행하여 프로그램 객체가 컴파일 과정을 시작한다.
2. 스캐너는 소스 파일을 토큰 단위로 분리한다.
3. 파서는 토큰을 이용하여 AST를 생성한다.
4. 바인더는 AST의 각 노드에 대응하는 심볼을 생성한다. 심볼은 선언된 타입의 노드 정보를 담고 있다.
5. 체커는 AST를 탐색하면서 심볼 정보를 활용하여 타입 검사를 수행한다.
6. 타입 검사 결과 에러가 없다면 이미터를 사용해서 자바스크립트 소스 파일로 변환한다.

# #5. 비동기 호출

### 5.1. API 요청

fetch 함수를 사용하여 외부 데이터 베이스에 접근하여 사용자가 장바구니에 추가한 정보를 호출해보자.

```tsx
const CartBadge: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  useEffcet(() => {
    fetch('카트정보 URL').then(({ cartItem }) => {
      setCartCount(cartItem.length);
    });
  }, []);
};
```

만약 백엔드에서 기능을 변경해야해서 API를 수정할 경우 ?

나의 비동기 호출 코드는 변경 요구에 취약할 수 있다.

**URL변경 뿐 아니라 모든 요청에 커스텀 헤더가 필요하다 같은 새로운 API 요청 정책이 추가 될 때마다 계속해서 비동기 호출을 수정해야하는 번거로움이 생긴다.**

### 5.2. API LAYER 도입 (with Axios)

**중복 제거 & 코드 간결화
공통 정책(예: 인증, 에러처리) 일괄 관리
자동 타입 적용 및 응답 일관성**

**위 3가지 측면에서, Axios 추상화 계층을 만드는 것이 좋다.**

**1. Axios 인스턴스 생성하기**

```tsx
// api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**2. 공통 인터셉터로 헤더나 에러처리 통합**

```tsx
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      // 로그아웃 처리 등
    }
    return Promise.reject(err);
  }
);
```

**3. API 호출 추상화**

```tsx
// services/cart.ts
import { api } from './api';

export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};
```

**4. 컴포넌트에서 사용**

```tsx
useEffect(() => {
  getCart().then((data) => {
    setCartCount(data.cartItem.length);
  });
}, []);
```

### 5.3. API 응답 타입 지정

백엔드 개발자와 협업할때, 같은 서버의 오는 응답의 형태를 맞춰, 타입 하나의 Response 타입으로 묶을 수 있다.

```tsx
interface Response<T> {
  data: T;
  status: string;
  serverDateTime: string;
  errorCode?: string;
  errorMessage?: string;
}

const fetchCart = (): AxiosPromise<Response<FetchCartResponse>> => {
  apiRequester.get < Response < FetchCartResponse >> 'cart';
};

const postCart = (
  postCartRequest: PostCartRequest
): AxiosPromise<Response<PostCartResponse>> => {
  apiRequester.post<Response<PostCartResponse>>('cart', postCartRequest);
};
```

### 5.4. 뷰모델 사용을 왜 해야하는가?

API 응답이 바뀌면, 우리가 생각할때 단순히 interface, Response<T>의 타입만 바꾸면 되는거 아닌가? 라고 생각할 수있지만, 실제로 해당 응답을 사용하는 모든 컴포넌트도 수정 대상이 된다.

예를 들면,

```tsx
interface FetchCartResponse {
  userId: number;
  items: { productId: number; quantity: number }[];
}

setCartItemCount(response.items.reduce((acc, cur) => acc + cur.quantity, 0));
```

response.items이라는 API 호출 결과로 상태변경을 시도하는 부분이 여러 컴포넌트에 반복된다고 가정하자. 이때 API 응답 구조가 바뀌어서 items 필드명이 변경 혹은 구조가 바뀐다면?

이 계산 로직이 퍼져 있는 모든 컴포넌트에 다 수정을 해야한다.

## **ViewModel 도입: “응답을 바로 쓰지 말고 가공해서 전달”**

**먼저 똑같이 API 응답 타입을 정의한다.**

```tsx
interface FetchCartResponse {
  userId: number;
  items: { productId: number; name: string; quantity: number }[];
}
```

**그 이후 컴포넌트에 필요한 정보인 ViewModel 타입을 지정한다.**

```tsx
interface CartViewModel {
  totalCount: number;
  productNames: string[];
}
```

**ViewModel 생성 함수**

```tsx
const toCartViewModel = (res: FetchCartResponse): CartViewModel => {
  return {
    totalCount: res.items.reduce((acc, cur) => acc + cur.quantity, 0),
    productNames: res.items.map((item) => item.name),
  };
};
```

**서비스 계층에서 가공한 뷰모델 반환**

```tsx
export const getCartViewModel = async (): Promise<CartViewModel> => {
  const { data } = await api.get<Response<FetchCartResponse>>('/cart');
  return toCartViewModel(data.data);
};
```

**컴포넌트에서는 ViewModel만 사용**

```tsx
useEffect(() => {
  getCartViewModel().then((viewModel) => {
    setCount(viewModel.totalCount);
    setProductList(viewModel.productNames);
  });
}, []);
```

### 5.5. 핵심은 API 호출 구조를 역할별로 깜끔하게 나눠라.

최원빈의 API 삼권분립론

### **1. apiClient – Axios 인스턴스 (기본 설정 + 인터셉터)**

```tsx
// apiClient.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  headers: { 'Content-Type': 'application/json' },
});

// 공통 요청 헤더 추가
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 에러 처리
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // 자동 로그아웃 or redirect
    }
    return Promise.reject(err);
  }
);
```

### **2. API 응답 타입 (서버 응답 interface)**

```tsx
// types/cart.ts
export interface FetchCartResponse {
  userId: number;
  items: { productId: number; quantity: number }[];
}

export interface CommonResponse<T> {
  status: string;
  data: T;
  errorCode?: string;
  errorMessage?: string;
}
```

### **3. API 함수 – 실제 요청 보내는 함수**

```tsx
// services/cart.ts
import { apiClient } from '../apiClient';
import { CommonResponse, FetchCartResponse } from '../types/cart';

export const fetchCart = () => {
  return apiClient.get<CommonResponse<FetchCartResponse>>('/cart');
};
```

### **(선택) 4. ViewModel (응답을 컴포넌트용으로 가공하고 싶을 때만)**

```tsx
// services/cart.ts
export const getCartSummary = async (): Promise<number> => {
  const { data } = await fetchCart();
  return data.data.items.reduce((sum, item) => sum + item.quantity, 0);
};
```

viewModel은 API 응답 데이터를 컴포넌트가 쓰기 좋게 변형한 객체정도로 생각하자.
