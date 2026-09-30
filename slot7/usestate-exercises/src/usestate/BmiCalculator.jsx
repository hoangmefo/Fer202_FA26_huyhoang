import { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';

function classify(bmi) {
  if (bmi < 18.5) {
    return {
      label: 'Thiếu cân',
      variant: 'info',
    };
  }

  if (bmi < 23) {
    return {
      label: 'Bình thường',
      variant: 'success',
    };
  }

  if (bmi < 25) {
    return {
      label: 'Thừa cân',
      variant: 'warning',
    };
  }

  return {
    label: 'Béo phì',
    variant: 'danger',
  };
}

function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('cm');

  // type="number" vẫn trả về chuỗi
  const h = Number(height);
  const w = Number(weight);

  // Quy đổi chiều cao về mét
  const heightInMeter = unit === 'cm' ? h / 100 : h;

  // Kiểm tra lỗi
  const errors = {};

  // Kiểm tra chiều cao
  if (height !== '') {
    if (unit === 'cm') {
      if (!(h >= 50 && h <= 250)) {
        errors.height = 'Chiều cao từ 50 đến 250 cm';
      }
    } else {
      if (!(h >= 0.5 && h <= 2.5)) {
        errors.height = 'Chiều cao từ 0.5 đến 2.5 m';
      }
    }
  }

  // Kiểm tra cân nặng
  if (weight !== '') {
    if (!(w >= 10 && w <= 300)) {
      errors.weight = 'Cân nặng từ 10 đến 300 kg';
    }
  }

  // Chỉ tính BMI khi dữ liệu hợp lệ và không trống
  const ready =
    height !== '' &&
    weight !== '' &&
    Object.keys(errors).length === 0;

  // BMI là dữ liệu dẫn xuất, không lưu vào state
  const bmi = ready
    ? w / (heightInMeter * heightInMeter)
    : null;

  // Kết quả cũng là dữ liệu dẫn xuất
  const result = bmi !== null ? classify(bmi) : null;

  // Đổi đơn vị cm <-> m
  const changeUnit = (nextUnit) => {
    if (nextUnit === unit) {
      return;
    }

    if (height !== '') {
      if (nextUnit === 'm') {
        // cm -> m
        setHeight(String(h / 100));
      } else {
        // m -> cm
        setHeight(String(h * 100));
      }
    }

    setUnit(nextUnit);
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <h2 className="mb-4">Máy tính BMI</h2>

          <Form>
            {/* CHIỀU CAO */}
            <Form.Group className="mb-3">
              <Form.Label>Chiều cao</Form.Label>

              <div className="d-flex gap-2">
                <Form.Control
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  isInvalid={!!errors.height}
                  placeholder={
                    unit === 'cm'
                      ? 'Nhập chiều cao (cm)'
                      : 'Nhập chiều cao (m)'
                  }
                />

                <Button
                  type="button"
                  variant={
                    unit === 'cm'
                      ? 'primary'
                      : 'outline-primary'
                  }
                  onClick={() => changeUnit('cm')}
                >
                  cm
                </Button>

                <Button
                  type="button"
                  variant={
                    unit === 'm'
                      ? 'primary'
                      : 'outline-primary'
                  }
                  onClick={() => changeUnit('m')}
                >
                  m
                </Button>
              </div>

              {errors.height && (
                <Form.Control.Feedback
                  type="invalid"
                  className="d-block"
                >
                  {errors.height}
                </Form.Control.Feedback>
              )}

              {!height && (
                <Form.Text className="text-muted">
                  Nhập chiều cao từ 50–250 cm hoặc
                  0.5–2.5 m.
                </Form.Text>
              )}
            </Form.Group>

            {/* CÂN NẶNG */}
            <Form.Group className="mb-3">
              <Form.Label>Cân nặng (kg)</Form.Label>

              <Form.Control
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                isInvalid={!!errors.weight}
                placeholder="Nhập cân nặng"
              />

              {errors.weight && (
                <Form.Control.Feedback type="invalid">
                  {errors.weight}
                </Form.Control.Feedback>
              )}

              {!weight && (
                <Form.Text className="text-muted">
                  Nhập cân nặng từ 10–300 kg.
                </Form.Text>
              )}
            </Form.Group>
          </Form>

          {/* KẾT QUẢ */}
          {result ? (
            <Alert variant={result.variant}>
              <strong>
                BMI = {bmi.toFixed(1)} → {result.label}
              </strong>
            </Alert>
          ) : (
            <Alert variant="light">
              Nhập đầy đủ chiều cao và cân nặng hợp lệ
              để xem kết quả BMI.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default BmiCalculator;