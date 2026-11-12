"""Build the tour's searchable, single-page travel document without PDF dependencies."""
from pathlib import Path
import textwrap

OUT = Path(__file__).resolve().parents[1] / 'public/desktop-tour-media/kyoto-stay.pdf'
commands = []

def color(hex_value):
    return ' '.join(f'{int(hex_value[i:i+2], 16)/255:.3f}' for i in (0, 2, 4))

def box(x, y, w, h, fill):
    commands.append(f'{color(fill)} rg {x} {y} {w} {h} re f')

def text(value, x, y, size=10, bold=False, fill='253141'):
    value = value.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')
    commands.append(f'BT /F{2 if bold else 1} {size} Tf {color(fill)} rg 1 0 0 1 {x} {y} Tm ({value}) Tj ET')

def paragraph(value, x, y, width=97, size=10, leading=13):
    for line in textwrap.wrap(value, width=width):
        text(line, x, y, size)
        y -= leading
    return y

def section(number, title, y):
    text(number, 46, y, 9, True, '008C82')
    text(title, 68, y, 12, True, '15273B')
    return y - 20

box(0, 0, 595, 842, 'FFFFFF')
box(0, 728, 595, 114, '15273B')
text('JAPAN / APRIL 2027', 46, 802, 9, True, '8FE0D1')
text('Kyoto stay', 46, 765, 31, True, 'FFFFFF')
text('Accommodation, arrival and departure plan', 46, 744, 11, False, 'DFE9F1')
box(46, 656, 503, 53, 'EFF7F5')
for x, label, value in [(60, 'STAY DATES', '14-17 April 2027'), (258, 'DURATION', '3 nights'), (410, 'TRAVELLERS', '2 adults')]:
    text(label, x, 691, 8, True, '52666A')
    text(value, x, 673, 12, True, '15273B')

y = section('01', 'Stay details and room requirements', 633)
y = paragraph('Spend three nights in Kyoto after the Tokyo part of the trip. Arrive on Wednesday, 14 April and depart on Saturday, 17 April. Keep the arrival evening flexible so there is time to settle in, find a nearby dinner option and prepare for the next morning.', 46, y)
y = paragraph('Room preference: one double or twin room for two adults, non-smoking, with a private bathroom, Wi-Fi and space for two suitcases. Check access with luggage, request a quiet room and ask whether bags can be stored before check-in or after checkout.', 46, y - 4)

y = section('02', 'Arrival plan / Wednesday 14 April', y - 17)
y = paragraph('Check out in Tokyo, allow a buffer for reaching the departure station and keep the Kyoto address and onward route available offline. Aim to arrive between 15:00 and 17:00 JST; confirm the property\'s reception hours and check-in time before travel.', 46, y)
y = paragraph('Keep photo identification, travel tickets and the accommodation confirmation easy to reach. Share the expected arrival time with the property and check the procedure for a delayed arrival. Leave the first evening free of timed activities.', 46, y - 4)

y = section('03', 'Plan for the four days', y - 17)
rows = [
    ('WED 14', 'Travel from Tokyo, check in and take a short neighbourhood walk.'),
    ('THU 15', 'Explore one old-street area; leave time for a garden and a food stop.'),
    ('FRI 16', 'Keep a flexible morning and an indoor alternative for wet weather.'),
    ('SAT 17', 'Pack, check out and leave a comfortable buffer for onward travel.'),
]
for index, (day, plan) in enumerate(rows):
    box(46, y - 7, 503, 24, 'F1F5F7' if index % 2 == 0 else 'F8FAFB')
    text(day, 56, y + 1, 8.5, True, '15273B')
    text(plan, 121, y + 1, 9)
    y -= 24

y = section('04', 'Booking and budget checks', y - 13)
y = paragraph('Before payment, record the chosen property name, full address, contact details and supplier booking reference. Check the total in JPY, including taxes and other charges, what is included in the room rate, when payment is due and any deposit or change fees.', 46, y)
y = paragraph('Read the cancellation conditions and note the exact deadline in the property\'s local time. Save the final confirmation, receipt, address and check-in instructions together. Keep a separate allowance for local transport, meals and unexpected expenses.', 46, y - 4)

y = section('05', 'Departure and offline checklist', y - 17)
y = paragraph('Pack on the evening of 16 April. Confirm the checkout deadline, settle any outstanding charges and arrange luggage storage if needed. Before leaving, check the room for chargers, documents and valuables, then verify the onward route and departure time.', 46, y)
y = paragraph('Keep offline: accommodation address and map, reception contact, confirmed travel tickets, booking confirmation, payment receipt, check-in instructions and emergency contact details. Both travellers should be able to access the essentials.', 46, y - 4)
assert y > 38, f'Document content exceeds the page: {y}'
box(46, 31, 503, 1, 'DCE5E8')
text('TRAVEL PLANNING RECORD', 46, 18, 7, True, '52666A')
text('Kyoto / 14-17 April 2027', 408, 18, 7, False, '52666A')

stream = '\n'.join(commands).encode('ascii')
objects = [
    b'<< /Type /Catalog /Pages 2 0 R >>',
    b'<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    b'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
    b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
    f'<< /Length {len(stream)} >>\nstream\n'.encode() + stream + b'\nendstream',
    b'<< /Title (Kyoto stay - Accommodation, arrival and departure plan) /Subject (14-17 April 2027, two adults, three nights) >>',
]
pdf = bytearray(b'%PDF-1.4\n')
offsets = [0]
for index, obj in enumerate(objects, 1):
    offsets.append(len(pdf))
    pdf += f'{index} 0 obj\n'.encode() + obj + b'\nendobj\n'
xref = len(pdf)
pdf += f'xref\n0 {len(objects)+1}\n0000000000 65535 f \n'.encode()
for offset in offsets[1:]:
    pdf += f'{offset:010} 00000 n \n'.encode()
pdf += f'trailer\n<< /Size {len(objects)+1} /Root 1 0 R /Info 7 0 R >>\nstartxref\n{xref}\n%%EOF\n'.encode()
OUT.write_bytes(pdf)
print(f'Created {OUT.name}: {len(pdf)} bytes; final body baseline {y}px')
