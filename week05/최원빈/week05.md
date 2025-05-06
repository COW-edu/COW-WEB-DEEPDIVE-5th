# #Intro. Generic 복습

구조는 동일한데 타입만 다르게 쓰고 싶다?

매번 타입 좁히기 (`type narrowing`) 하는 게 귀찮다?

객체의 key가 유동적인 경우 타입을 어떻게 잡아야 할까?

이 세가지 고민을 필요하기 위한 타입 지정 방식이 Generic입니다.

# **Generic Interface**

`interface`에 타입 매개변수 `<T>`를 붙이면, 값의 타입을 재사용 가능하게 만들어줍니다.

```tsx
interface KeyPair<K, V> {
  key: K;
  value: V;
}

let keypair1: KeyPair<string, number> = {
  key: 'id',
  value: 101,
};

let keypair2: KeyPair<string, string[]> = {
  key: 'tags',
  value: ['ts', 'js'],
};
```

구조는 같지만 내부 타입만 다른 여러 데이터를 효율적으로 다룰 수 있게 해주는 것!

Generic Interface의 핵심입니다.

# Index Signature

객체의 key가 유동적일때, 여러 type을 유동적으로 맞춰주는 방식이 아닌 하나의 type으로 그 유동성을 커버하기 위해 쓰입니다.

[key :string] : number

key 타입 지정할때 [] 이거 배열처럼 보일 수도 있지만 전혀 그렇지 않고 Index siganature의 key 타입 지정방식이라고 이해하면 좋습니다.

```tsx
interface NumberMap {
  [key: string]: number;
}

const score: NumberMap = {
  math: 90,
  eng: 80,
};
```

참고로 자바스크립트에서 객체의 key는 항상 string 취급을 받아서, 1 : 90 이렇게도 상관은 없습니다만 굳이 그럴 필요는 없어 보입니다.

# Index Siganture with Generic

인텍스 시그니처를 제네릭화 써서 하면 아주 유연해지니 이런 방식도 있답니다!

```tsx
interface MapGeneric<T> {
  [key: string]: T;
}

const booleanMap: MapGeneric<boolean> = {
  isAdmin: true,
  hasAccess: false,
};
```

위는 벨류값을 유동적으로 Boolean으로 지정한 예시입니다.

### Type으로도 가능

용법은 매우 비슷하다만, Type , Interface를 쓸 상황마다 다를 것 같습니다.

```tsx
type MapType<T> = {
  [key: string]: T;
};

const strMap: MapType<string> = {
  first: 'hello',
  second: 'world',
```

# 실전 예시 : 유저 구분하기

```tsx
interface Student {
  type: 'student';
  school: string;
}

interface Developer {
  type: 'developer';
  skill: string;
}

//1
interface User {
  name: string;
  profile: Student | Developer;
}

const goSchool = (user: User) => {
  if (user.profile.type !== 'student') {
    console.log('님 학생아님');
    return;
  }
  console.log(user.profile.school); // 타입 좁히기 이후 접근
};

//2
interface UserGeneric<T> {
  name: string;
  profile: T;
}

const goSchoolGeneric = (user: UserGeneric<Student>) => {
  console.log('등교 ㄱㄱ', user.profile.school); // 좁히기 없이 바로 접근 가능
};
```

위의 1번은 제네릭을 섞지 않고 그냥 깡으로 타입 좁히기를 불가피하게 한 예시입니다.

아래의 2번은 제네릭을 섞었더니, 타입 좁히기가 크게 필요가 없는 케이스입니다.

아주 미묘한 차이지만 효과가 있겠습니다.

# Generic + Promise

비동기 함수 처리할때 특히 API 많이들 보는 리턴타입이 Promise인 여러 함수들.

단순히 `.then`, `.catch`만 쓰는 데서 끝내지 말고,

**직접 정의한 타입과 함께 안전하게 다루는 방법**까지 정리해봅니다.

## 기본 구조 복습

```tsx
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = false;
    if (success) {
      resolve(20); // 성공 시
    } else {
      reject(new Error('비동기 작업 실패')); // 실패 시
    }
  }, 3000);
});

promise
  .then((result) => console.log('성공!', result))
  .catch((err) => console.log('실패!', err.message));
```

- `.then()`에서는 `resolve`로 전달한 값 매개변수 즉 ,(성공시의 응답)
- `.catch()`에서는 `reject`로 전달한 오류

참고로 두 매개변수 타입은 any로 지정되어있기에 뭐든 보내면 then,catch에서 응답이 가능합니다.

---

## 게시글(Post) 정보를 비동기로 가져오기

### 게시글 타입 정의

```tsx
interface Posting {
  id: number;
  title: string;
  content: string;
}
```

### Promise를 반환하는 함수로 구현

이떄 Promise의 Type을 정의한 타입으로 넣어준다.

```tsx
const fetchPost = () => {
  return new Promise<Posting>((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: 1, title: '제목', content: '내용' });

      // reject, resolve 함수의 매개변수는 웬만하면 다 any type이다.
      // resolve: 성공 시 결과값
      // reject: 실패 시 오류값 (보통 Error 객체)
    }, 3000);
  });
};
```

- 여기서 `Promise<Posting>`을 반환하겠습니다.
- **Promise의 정의된 매개변수 (resolve)의 매개변수 타입이 Generic type인 Posting이 될 것입니다.**
- `.then()` 안에서 `res`는 `Posting` 타입으로 추론됩니다.
- 원래는 Default 였던 Unknown 타입으로 추론되었을겁니다.

---

### 실제 호출 예시

```tsx
const postReq = fetchPost(); // postReq는 Promise<Posting>

postReq.then((res) => {
  console.log(res.id);
});
```

> 즉, .then((res) => ...) 내부에서 res는 resolve가 전달한 Posting 객체이므로
>
> 우리가 정의한 `interface Posting`에 따라 안전하게 접근할 수 있습니다.

# #1. 타입 확장하기 + 좁히기

## 타입 확장하기

타입 확장은 기존 타입을 사용해서 새로운 타입을 정의하는 것입니다.

extends , 교차타입, 유니온 타입등을 활용해서 타입을 확장합니다.

## 타입 확장의 장점은 무엇일까?

가장 큰 장점은 코드 중복을 줄인 다는것입니다.

위에서 소개한 제네릭과 비슷한 취지이긴 합니다!

쉽게 말하면 공통 타입을 재사용한다에서 의미가 있겠습니다.

```tsx
interface BaseUser {
  name: string;
  email: string;
}

interface Admin extends BaseUser {
  role: 'admin';
}

interface Member extends BaseUser {
  membershipLevel: number;
}
```

공통 필드 추출해서 유지보수 용이하게 하는 목적이 있습니다.

확장한 타입마다 기존 속성에서 추가해야하는 필요한 속성만 추가하니까 **DRY 원칙**을 지킨것입니다.

## 1.1 extends 확장

**DRY = Don’t Repeat Yourself**

참고로, “자기 자신을 반복하지 말라”\*\*는 소프트웨어 개발의 핵심 원칙입니다.

예를 들어 메뉴에 대한 타입을 지정하고 싶다면, 먼저 BaseMenu에 관한 타입을 지정합니다.

```tsx
interface BaseMenuItem {
  itemName: string | null;
  itemImageUrl: string | null;
  itemDiscountAmount: number;
  stock: number | null;
}

//만약 장바구니라는 요소가 새로 생겨서 타입에 수량에 관한 정보가 추가되었다면?
interface BaseMenuCartItem extends BaseMenuItem {
  //BaseMenuItem의 기본적인 속성은 다 지님
  quantity: number; // 이제 총 5개의 속성을 지니겠다. 새로운거 까지
}
```

## 1.2. Union 확장

```tsx
type MyUnion = A | B;
```

A와 B의 유니온 타입인 MyUnion은 타입 A와 B의 합집합입니다.

집합 A의 모든 원소는 집합 MyUnion의 원소이며, 집합 B의 모든 원소 역시 집합 MyUnion의 원소라는 뜻입니다.

**즉, A 타입과 B 타입의 모든 값이 MyUnion 타입의 값이 됩니다.**

주의해야 할 점은, 유니온 타입으로 선언된 값은 **유니온 타입에 포함된 모든 타입이 공통으로 갖고 있는 속성에만 접근 할 수 있습니다.**

```tsx
interface CookingStep {
  orderId: string;
  price: number;
}

interface DeliveryStep {
  orderId: string;
  time: number;
  distance: string;
}

function getDeliveryDistance(step: CookingStep | DeliveryStep) {
  return step.distance;
  // Property ‘distance’ does not exist on type ‘CookingStep | DeliveryStep’
  // Property ‘distance’ does not exist on type ‘CookingStep’
}
```

위의 예시로 현재 함수의 리턴값으로 distance 속성에 접근하려 하는데, step 이라는 매개변수의 타입은 union type으로 두 타입의 공통속성에 distance는 존재하지 않습니다.

따라서 에러를 발산할 것.

## 1.3. 교차 타입

```tsx
type MyIntersection = A & B;
```

MyIntersection 타입의 모든 값은 A 타입의 값이며, MyIntersection 타입의 모든 값은 B 타입의 값입니다.

집합의 관점에서 해석해보면 집합 MyIntersection의 모든 원소는 집합 A의 원소이자 집합 B의 원소임을 알 수 있습니다.

교차 타입은 유니온 타입과 비슷하게 기존 타입을 합쳐 필요한 기능을 가진 하나의타입으로 만든다는 것은 동일하지만, 타입을 집합으로 바라봤을때의 관점에서 교집합과 합집합의 관점이 다르듯 차이점이 존재합니다.

```tsx
interface CookingStep {
  orderId: string;
  time: number;
  price: number;
}

interface DeliveryStep {
  orderId: string;
  time: number;
  distance: string;
}

type BaedalProgress = CookingStep & DeliveryStep;

function logBaedalInfo(progress: BaedalProgress) {
  console.log(`주문 금액: ${progress.price}`);
  console.log(`배달 거리: ${progress.distance}`);
}
```

위의 예시를 보면 합집합으로 즉 유니온 타입으로는 위의 distance,price 속성에 접근 할 수 없을것입니다. 그러나, 교집합으로의 타입은 가능하겠습니다. 두개의 타입의 속성들을 모두 만족하는 하나의 타입이기 떄문입니다.

### 공통 속성이 전혀 존재하지 않아도 교집합은..?

각각의 타입들의 속성이 새로운 타입의 각각의 속성이기에

뭐 아무상관이 없겠습니다.

```tsx
/* 배달 팁 */
interface DeliveryTip {
  tip: string;
  }
/* 별점 */
interface StarRating {
  rate: number;
}
/* 주문 필터 */
type Filter = DeliveryTip & StarRating;

const filter: Filter = {
  tip: “1000원 이하”,
  rate: 4,
};
```

### 극단적인 예시

```tsx
type IdType = string | number;
type Numeric = number | boolean;

type Universal = IdType & Numeric;
```

퀴즈 이럴 경우 Universal의 type은 ? ( number)

## 1.4 참고사항 두개 (교집합 Type, Extend시의 주의점)

```tsx
interface BaseMenuItem {
  itemName: string | null;
  itemImageUrl: string | null;
  itemDiscountAmount: number;
  stock: number | null;
}

interface BaseCartItem extends BaseMenuItem {
  quantity: number;
}

type BaseMenuItem = {
  itemName: string | null;
  itemImageUrl: string | null;
  itemDiscountAmount: number;
  stock: number | null;
};

type BaseCartItem = {
  quantity: number;
} & BaseMenuItem;

const baseCartItem: BaseCartItem = {
  itemName: “지은이네 떡볶이”,
  itemImageUrl: “https://www.woowahan.com/images/jieun-tteokbokkio.png”,
  itemDiscountAmount: 2000,
  stock: 100,
  quantity: 2,
};
```

교집합 타입을 활용하려면 interface가 아닌 type으로 선언한 타입과 교집합화 해야합니다.

```tsx
interface DeliveryTip {
  tip: number;
}

interface Filter extends DeliveryTip {
  tip: string;
  // Interface ‘Filter’ incorrectly extends interface ‘DeliveryTip’
  // Types of property ‘tip’ are incompatible
  // Type ‘string’ is not assignable to type ‘number’
}
```

위의 경우로는 같은 속성값을 갖는 interface끼리의 확장을 시도하였는데 이럴 경우 오류가 납니다.

결론적으로 주어진 타입에 무분별하게 여러 겹치는 속성들이 있음에도 불구하고 타입들을 남발하는 것은 좋은태도가 아닙니다. 가능하다면 확장을 하여 중복되는 코드를 최소화하는 DRY 원칙을 지키는 것이 권장된다고 생각합니다.

# #2. 타입 좁히기 = 타입 가드

타입스크립트에서 타입좁히기는 변수 또는 표현식의 타입 범위를 작은 범위로 좁히겠다는 의지 표명입니다. 이를 통해 정확하고 안전한 타입 추론이 가능해집니다.

## 2.1. 타입가드에 따라 분기 처리 (아무렇게나 하면 안됌)

조건문과 타입가드를 활용하여 변수나 표현식의 타입 범위를 좁힌 다는 것입니다.

- 타입 가드 : 런타임에 조건문을 사용하여 타입을 검사하고 타입 범위를 좁혀주는 기능

예를들어, 어떤 타입이 A|B 타입의 매개변수를 받을때, A , B 중 어떤 타입을 받을지 구분하여 로직처리를 해야하는 상황이 올 겁니다.

그럼 단순하게 조건문 처리하면 되겠네요? (컴파일 타임에서 런타임으로 갈때 타입 정보는 모두 제거가 되기에, 단순하게 조건문으로 하는 것은 적절하지 않습니다.)

**쉽게 설명하면, 단순히 “타입이 A 인지?” 처럼 조건문을 작성해서는 안 되고, 런타임 기준으로 구분할 수 있게 분기 해야합니다.**

**그럼 런타임 기준으로 구분가능하게는 어떻게 하는가?**

- typeof, instanceof, in과 같은 연산자를 사용해서 제어문으로 특정 타입 값을 가질 수밖에 없는 상황을 유도하여 자연스럽게 타입을 좁히는 방식입니다.

먼저 자바스크립트 연산자를 이렇게 쓰는 이유는? 애시당초에 자바스크립트 연산자로 해야 런타임에 유효한 타입가드를 만들것이 아닌가?

### 런타임에 유효하다 ⇒ not only JS but also TS에도 구동되는 문법이어야합니다.

원시타입을 추론할때는 (typeOf)

인스턴스화된 객체타입을 추론할때는 (instanceOf)

객체의 속성이 있는지 없는지에 따른 구분 (in 연산자)

이 3개면 끝입니다.

## 2.2 typeOf 연산자 (원시 타입 추론)

원시타입 7가지 → number, boolean, undefined, symbol, string, null, bigint + object

```tsx
const replaceHyphen: (date: string | Date) => string | Date = (date) => {
  if (typeof date === “string”) {
  // 이 분기에서는 date의 타입이 string으로 추론된다
  return date.replace(/-/g, “/”);
  }

  return date;
};
```

## 2.3 instanceof 연산자 ( 인스턴스된 객체 타입)

A instanceof B 형태로 사용하며 A에는 타입을 검사할 대상 변수, B에는 특정 객체의 생성자가 들어가는 것입니다.

사실 여기서 생성자 하면 약간 헷갈릴수도 있긴합니다. 생성자 함수 = 클래스라고 이해하시면 더 이해가 쉬울 겁니다.

```tsx
class Dog {
  constructor(name) {
    this.name = name;
  }
}

const d = new Dog('Choco');
console.log(d.constructor === Dog); // Dog()가 생성자 함수
```

instanceof은 A의 프로로타입 (유전자) 체인에 거슬러 올라갔을때 생성자인 B가 존재하는지 검사하는 것 방식으로 동작합니다.

```tsx
const input = document.createElement('input');
input instanceof HTMLInputElement; // true!
```

input → HTMLInputElement.prototype → HTMLElement.prototype →

## 2.4 in 연산자 객체의 속성이 있는지?

```tsx
interface BasicNoticeDialogProps {
  noticeTitle: string;
  noticeBody: string;
}

interface NoticeDialogWithCookieProps extends BasicNoticeDialogProps {
  cookieKey: string;
  noForADay?: boolean;
  neverAgain?: boolean;
}

export type NoticeDialogProps =
| BasicNoticeDialogProps
| NoticeDialogWithCookieProps;

const NoticeDialog: React.FC<NoticeDialogProps> = (props) => {
  if (“cookieKey” in props) return <NoticeDialogWithCookie {...props} />; // NoticeDialogWithCookieProps 타입
  return <NoticeDialogBase {...props} />; // BasicNoticeDialogProps 타입
};
```

자바스크립트의 in 연산자는 런타임의 값만을 검사하지만 타입스크립트에서는 객체 타입에 속성이 존재하는지를 검사합니다.

위의 코드처럼 여러 객체 타입을 유니온 타입으로 가지고 있을 때 in 연산자를 사용해서 속성의 유무에 따라 조건 분기를 할 수 있습니다.

위의 코드를 보면 props (매개변수 객체 ) 속성 중 cookieKey가 있으면 NoticeDiaLog.. 타입의 React.FC

아니라면 BasicNotice.. 타입의 React.FC를 반환합니다.

**왜 굳이 interface를 union해서 in으로 분기하느냐? 그냥 상속 관계라면 instanceof나 속성 접근으로 분기하면 안 되나?**

결론적으로는 그럴만한 이유가 존재합니다. narrowing은 반드시 union type을 해야하며,

interface 자체로는 unioning을 지원하지 않습니다.

```tsx
interface AB = A | B; // ❌ SyntaxError: '=' is not allowed in interface
```

> interface 상속만으로는 타입 분기가 불가능합니다.

> 타입스크립트가 타입을 narrowing 해주도록 하려면,
>
> **반드시 | (유니온 타입) → type AB = A | B;**

> 그 위에서 in 연산자를 써야 분기처리가 의미 있게 작동합니다.

## 2.5. is 연산자 → 사용자 정의 타입 가드

타입 명제(type predicates)인 함수를 정의하여 사용할 수 있습니다.

A is B 형식으로 작성하면 되는데 여기서 A는 매개변수 이름이고 B는 타입입니다.

```tsx
const isDestinationCode = (x: string): x is DestinationCode =>
  destinationCodeList.includes(x);
```

타입스크립트에게 반환 값에 대한 타입 정보를 알려주고 싶을 때 is를 사용할 수 있습니다.

# #3. 타입 좁히기

## 3.1. 왜 해야할까?

```tsx
type TextError = {
  errorCode: string;
  errorMessage: string;
};
type ToastError = {
  errorCode: string;
  errorMessage: string;
  toastShowDuration: number; // 토스트를 띄워줄 시간
};
type AlertError = {
  errorCode: string;
  errorMessage: string;
  onConfirm: () => void; // 얼럿 창의 확인 버튼을 누른 뒤 액션
};

type ErrorFeedbackType = TextError | ToastError | AlertError;
const errorArr: ErrorFeedbackType[] = [
  { errorCode: “100”, errorMessage: “텍스트 에러” },
  { errorCode: “200”, errorMessage: “토스트 에러”, toastShowDuration: 3000 },
  { errorCode: “300”, errorMessage: “얼럿 에러”, onConfirm: () => {} },
];
```

ErrorFeedbackType의 원소를 갖는 배열 errorArr을 관찰해보자.

현재 토스트에러와 얼러트 에러에는 타입만의 고유한 속성이 존재한다.

이를 특수 필드라고도 하는데, 만약 이 두가지 특수 필드를 모두 가지는 객체가 있다고 가정하자.

그럼 당연히 오류가 날 것이라고 기대하지만 자바스크립트는 덕 타이핑 언어 즉, 그 속성을 가지고 있으면 그 객체로 인지해버리는 것이다.

의미를 알 수 없는 에러 객체가 생겨날 위험성이 커진다.

## 3.2. 식별 가능한 유니온

그렇다면 우린 에러 타입을 구분할 방법이 필요하다.

각 타입이 비슷한 구조를 가지지만 서로 호환되지 않도록 만들어주기 위해서는 타입들이 서로 포함 관계를 가지지 않도록 정의해야 한다.

이때 바로 **식별할 수 있는 유니온**을 만들어야 한다.

쉽게 말하면 서로를 정확하게 식별할 수 있는 공통 속성(필드)값을 만들어 주는 것이다.

```tsx
type TextError = {
  errorType: “TEXT”;
  errorCode: string;
  errorMessage: string;
};
type ToastError = {
  errorType: “TOAST”;
  errorCode: string;
  errorMessage: string;
  toastShowDuration: number;
}
type AlertError = {
  errorType: “ALERT”;
  errorCode: string;
  errorMessage: string;
  onConfirm: () = > void;
};
```

위의 예시에서의 Distributed union은 errorType이라는 필드일 것이다.

**각 에러타입마다 이 필드에 대한 다른 값을 가지게 (유니크하게) 리터럴 판별자를 달아주는 것.**

이들은 이렇다면 죽어다 깨어나도 포함 관계가 아니게 된다.

```tsx
type ErrorFeedbackType = TextError | ToastError | AlertError;

const errorArr: ErrorFeedbackType[] = [
  { errorType: “TEXT”, errorCode: “100”, errorMessage: “텍스트 에러” },
  {
    errorType: “TOAST”,
    errorCode: “200”,
    errorMessage: “토스트 에러”,
    toastShowDuration: 3000,
  },
  {
    errorType: “ALERT”,
    errorCode: “300”,
    errorMessage: “얼럿 에러”,
    onConfirm: () => {},
  },
  {
    errorType: “TEXT”,
    errorCode: “999”,
    errorMessage: “잘못된 에러”,
    toastShowDuration: 3000, // Object literal may only specify known properties, and ‘toastShowDuration’ does not exist in type ‘TextError’
    onConfirm: () => {},
  },
  {
    errorType: “TOAST”,
    errorCode: “210”,
    errorMessage: “토스트 에러”,
    onConfirm: () => {}, // Object literal may only specify known properties, and ‘onConfirm’ does not exist in type ‘ToastError’
  },
  {
    errorType: “ALERT”,
    errorCode: “310”,
    errorMessage: “얼럿 에러”,
    toastShowDuration: 5000, // Object literal may only specify known properties, and ‘toastShowDuration’ does not exist in type ‘AlertError’
  },
];
```

위 예시처럼 우리가 유니온을 할때 공통 필드로 구분값을 리터럴 타입으로 시켜놨기에, 한 객체는 이제 유니크한 타입을 갖게 된다.

정리하면, 타입을 여러가지 쓰지만 타입 겹침을 걱정할때 유니크한 공통필드를 만들어놔 유니온의 식별할 수 있는 판별자를 선정하자.

## 3.3 어떤것으로 선정해야하는가?

식별할 수 있는 유니온의 판별자는 **유닛 타입**으로 선언되어야 정상적으로 동작한다.

너무 당연한것이다. 만약 type을 number로 한다치면,

1도 number, 2도 number인데 인데 어떻게 유니크하게 구분을 할 수 있겠는가?

**공식 깃허브에서는 “리터럴 타입”을 활용하라고 권장한다.**

# 참고사항. ExhausitveChecking

```tsx
type ProductPrice = “10000” | “20000”;

const getProductName = (productPrice: ProductPrice): string => {
  if (productPrice === “10000”) return “배민상품권 1만 원”;
  if (productPrice === “20000”) return “배민상품권 2만 원”;
  else {
    return “배민상품권”;
  }
};
```

여기서 5000원짜리 상품권이 추가됬다.

그렇다면?

type을 추가하는 것 뿐만 아니라 관련 함수들도 수정을 해줘야했다.

그러나 만약 함수수정을 망각했을 경우, 치명적인 오류가 발생할 가능성이 있다.

따라서 활용하는것이 exhausitveChecking!

exhaustiveCheck 함수를 자세히 보면, 이 함수는 매개변수를 never 타입으로 선언하고 있다. 즉, 매개변수로 그 어떤 값도 받을 수 없으며 만일 값이 들어온다면 에러를 내뱉는다.

이 함수를 타입 처리 조건문의 마지막 else 문에 사용하면 앞의 조건문에서 모든 타입에 대한 분기 처리를 강제하는 것이다.

```tsx
type ProductPrice = “10000” | “20000” | “5000”;

const getProductName = (productPrice: ProductPrice): string => {
  if (productPrice === “10000”) return “배민상품권 1만 원”;
  if (productPrice === “20000”) return “배민상품권 2만 원”;
  if (productPrice === “5000”) return “배민상품권 5천 원”; // 조건 추가 필요
  else {
    return “배민상품권”;
  }
};

type ProductPrice = “10000” | “20000” | “5000”;

const getProductName = (productPrice: ProductPrice): string => {
  if (productPrice === “10000”) return “배민상품권 1만 원”;
  if (productPrice === “20000”) return “배민상품권 2만 원”;
  // if (productPrice === “5000”) return “배민상품권 5천 원”;
  else {
    exhaustiveCheck(productPrice); // Error: Argument of type ‘string’ is not assignable to parameter of type ‘never’
    return “배민상품권”;
  }
};

const exhaustiveCheck = (param: never) => {
  throw 이new Error(“type error!”);
};
```

# #4. 타입 활용하기

## 4.1 조건부 타입에 관하여

타입스크립트의 조건부 타입은 자바스크립트의 삼항 연산자와 동일한 형태를 가진다.

우리가 리액트를 활용할때 삼항연산자로 코드를 처리하듯, 타입을 조건화 시켜서 처리한다.

```tsx
Condition ? A : B;
// Condition이 true일 때 A 타입
// Condition이 false일 때 B 타입
```

조건부 타입을 활용하면 얻을 수 있는 **장점**

- **중복되는 타입 코드를 제거** 가능하다
- 상황에 따라 적절한 타입을 얻을 수 있기에 **더욱 정확한 타입 추론**이 가능하다

아래는 어떤 상황에서 조건부 타입이 필요한지, 조건부 타입을 적용함으로써 어떤 장점을 얻을 수 있는지 알아본다.

## 4.1.1 extends & generic 활용 조건부 타입

### 제네릭 제한의 개념과 아주 밀접한 개념이다.

```tsx
function printName<T extends string>(name: T) {
  // name은 string 또는 string literal (예: "kim", "lee")
}
```

T는 string의 서브타입으로 제한한다는것이 제네릭 제한인데

그렇다면 T가 들어올 수 있는 타입은 문자열이거나 문자열 리터럴 밖에 없겠다.

```tsx
type ApiResponse<T> = T extends 'user'
  ? { name: string; age: number }
  : T extends 'post'
  ? { title: string; body: string }
  : never;

type UserRes = ApiResponse<'user'>; // { name: string; age: number }
type PostRes = ApiResponse<'post'>; // { title: string; body: string }
type Invalid = ApiResponse<'comment'>; // never
```

이제 위 예시 보면 T extends “user” 라는 것은 user이라는 문자열 리터럴로 제네릭을 제한 한 것. 한 층 더 엄격해진 제한이라고 이해하면 쉽다.

## 왜 써야하는가 굳이?

결론부터 얘기하면 컴파일러가 data 구조를 추론해야하기 때문이다.

아래의 예시 보면 data는 any type이다.

type이라는 매개변수로 결정나는 조건문인데, data는 뭐라고 둘게 애매하다.

이유는 조건부 처리되는 조건부 타입이기 때문이다. 따라서 as를 써야하고 위험해진다..

쉽게 말하면 조건부 타입을 슬기롭게 제한을 하지 않으면 조건부로 타입을 먹이고 싶을때, 애매해진다는 것이다.

이때 아래의 예시를 보면, T라는 것이 “user”로 extends되었다

이 말은 리터럴 타입 user이면 T 타입은 name,age 객체의 타입을 따른다.

parseData의 두번째 매개변수 data는 ApiResponse<T>로 안전하게 타입을 any를 쓰지않고 확정지을수 있는 것이다.

```tsx
function parseData(type: 'user' | 'post', data: any) {
  if (type === 'user') {
    const user = data as { name: string; age: number }; // ❌ 안전하지 않음
  } else {
    const post = data as { title: string; body: string }; // ❌ 위험함
  }
}

type ApiResponse<T> = T extends 'user'
  ? { name: string; age: number }
  : T extends 'post'
  ? { title: string; body: string }
  : never;

function parseData<T extends 'user' | 'post'>(type: T, data: ApiResponse<T>) {}
```

## 참고. 템플릿 리터럴 타입 활용하기

먼저 TypeScript에서는 문자열 리터럴 타입을 조합할 수 있다.

쉽게말하면 템플릿 리터럴의 방식으로 타입을 합칠수가 있다는것이다.

```tsx
type Prefix = 'get' | 'post';
type Route = 'User' | 'Article';

type ApiKey = `${Prefix}${Route}`;
// 결과 4가지 속성: "getUser" | "getArticle" | "postUser" | "postArticle"
```

왜 4가지일까? 경우의 수 2x2 가 합쳐지면서 만드는 카타시안 곱 느낌으로 이해하면 쉽다

```tsx
type EventName<T extends string> = `on${Capitalize<T>}`;
type A = EventName<'click'>; // "onClick"
type B = EventName<'hover'>; // "onHover"
```

Capitalize ()는 첫글자를 대문자로 바꿔주는 내장 유틸리티 타입이다.

카타시안 곱의 경우의 수처럼 작동하기에 너무 많이 쓰면 좋진 않겠다.
