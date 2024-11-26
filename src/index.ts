import { Container, injectable, inject, optional } from 'inversify';

@injectable()
class A {
  method(): string {
    return 'A';
  }
}

@injectable()
class B {
  constructor(
    private a: A,
    @inject('c') @optional() private c: typeof funcC = funcC,
  ) {}

  method(): string {
    return [this.a.method(), this.c(), 'B'].join(',');
  }
}

function funcC(): string {
  return 'funcC';
}

function mockFuncC1(): string {
  return 'mockFuncC1';
}

function mockFuncC2(): string {
  return 'mockFuncC2';
}

{
  const container = new Container();
  container.bind(A).to(A).inSingletonScope();
  container.bind(B).to(B).inSingletonScope();
  container.bind('c').toConstantValue(mockFuncC1);

  const instance = container.get(B);
  console.log(instance.method());
}
