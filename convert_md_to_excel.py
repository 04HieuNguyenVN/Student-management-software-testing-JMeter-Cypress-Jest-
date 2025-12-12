
import pandas as pd
import re
import os

def parse_markdown_table(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    data = []
    headers = []
    
    # Simple state machine
    # 0: seeking header
    # 1: seeking separator
    # 2: seeking data
    state = 0
    
    for line in lines:
        line = line.strip()
        if not line.startswith('|'):
            continue
            
        # Remove leading/trailing pipes and split
        cells = [c.strip() for c in line.split('|')[1:-1]]
        
        if state == 0:
            headers = cells
            state = 1
        elif state == 1:
            # Check if it's a separator line (---)
            if all(set(c).issubset({'-', ':', ' '}) for c in cells):
                state = 2
            else:
                # Maybe there was no separator or it's data immediately? 
                # Should not happen in well-formed md, but let's handle
                state = 2
                data.append(cells)
        elif state == 2:
            # Collect data even if headers reset (multiple tables)
            # Check if it's a new header or separator
            if all(set(c).issubset({'-', ':', ' '}) for c in cells):
                continue # Skip separators in middle
            if cells == headers:
                continue # Skip repeated headers
            
            # Map columns if counts differ (handle merged cells or bugs?)
            # For now assume perfect table
            if len(cells) == len(headers):
                row = dict(zip(headers, cells))
                data.append(row)

    return pd.DataFrame(data)

def export_to_excel(df, output_path):
    # Rename columns to Vietnamese friendly if needed, but they are already in VN in MD
    
    # Create Excel writer object
    with pd.ExcelWriter(output_path, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Test Cases')
        
        # Auto-adjust columns width
        worksheet = writer.sheets['Test Cases']
        for column_cells in worksheet.columns:
            length = max(len(str(cell.value)) for cell in column_cells)
            if length > 50: length = 50 # Cap width
            worksheet.column_dimensions[column_cells[0].column_letter].width = length + 2

if __name__ == "__main__":
    md_file = "TEST_SUMMARY.md"
    xlsx_file = "Danh_sach_Test_Case.xlsx"
    
    if not os.path.exists(md_file):
        print(f"Error: {md_file} not found.")
    else:
        print(f"Reading {md_file}...")
        df = parse_markdown_table(md_file)
        print(f"Found {len(df)} test cases.")
        
        if not df.empty:
            print(f"Exporting to {xlsx_file}...")
            export_to_excel(df, xlsx_file)
            print("Done.")
        else:
            print("No data found in markdown table.")
