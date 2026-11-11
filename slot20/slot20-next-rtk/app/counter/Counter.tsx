'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
  selectCount,
  selectStep,
  stepChanged,
} from '@/lib/features/counter/counterSlice';

const STEPS = [1, 5, 10] as const;

export default function Counter() {
  const count = useAppSelector(selectCount);
  const step = useAppSelector(selectStep);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState('2');
  const amountNumber = Number(amount);
  const isAmountValid = Number.isFinite(amountNumber) && amountNumber !== 0;
  const countColor =
    count > 0 ? 'text-green-600' : count < 0 ? 'text-red-600' : 'text-gray-400';

  return (
    <section className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
      <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
        Giá trị hiện tại
      </p>
      <p className={`my-4 text-7xl font-black tabular-nums transition ${countColor}`}>
        {count}
      </p>

      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(decrement())}
          className="size-14 rounded-full bg-red-500 text-2xl font-bold text-white transition hover:bg-red-600 active:scale-90"
          aria-label="Giảm"
        >
          −
        </button>
        <button
          type="button"
          onClick={() => dispatch(reset())}
          className="rounded-full border border-gray-300 px-6 font-semibold transition hover:bg-gray-100"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => dispatch(increment())}
          className="size-14 rounded-full bg-green-500 text-2xl font-bold text-white transition hover:bg-green-600 active:scale-90"
          aria-label="Tăng"
        >
          +
        </button>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-2 w-full text-sm text-gray-500">Bước nhảy</legend>
        <div className="inline-flex overflow-hidden rounded-lg border border-gray-300">
          {STEPS.map((value) => (
            <button
              type="button"
              key={value}
              onClick={() => dispatch(stepChanged(value))}
              aria-pressed={step === value}
              className={`px-4 py-1.5 text-sm font-semibold transition ${
                step === value
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </fieldset>

      <form
        className="mt-6 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          if (isAmountValid) {
            dispatch(incrementByAmount(amountNumber));
          }
        }}
      >
        <label className="sr-only" htmlFor="counter-amount">
          Số lượng cần cộng
        </label>
        <input
          id="counter-amount"
          type="number"
          step="any"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!isAmountValid}
          className="whitespace-nowrap rounded-lg bg-blue-600 px-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-40"
        >
          Cộng {isAmountValid ? amountNumber : 0}
        </button>
      </form>
    </section>
  );
}
