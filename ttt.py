ALTER TABLE salaire
        ADD Valide nvarchar(50) NULL --Or NOT NULL.
 
    DEFAULT ('pasvalide')--Optional Default-Constraint.
WITH VALUES --Add if Column is Nullable and you want the Default Value for Existing Records.

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import pandas as pd
import numpy as np  # Import numpy for handling NaN values
import os


def get_first_value(dataframe):
    if isinstance(dataframe, pd.DataFrame) and not dataframe.empty:
        first_column = dataframe.iloc[:, 0]  # Select the first column
        first_value = first_column.iloc[0]  # Get the first value of the first column
        # Convert to int and then to string to remove ".0"
        first_value_str = str(int(first_value)) if first_value.is_integer() else str(first_value)
        return first_value_str
    else:
        return None


def dynamic_inner_join_excel(input_file1, input_file2):
    try:
        # Read the Excel files into pandas DataFrames
        df1 = pd.read_excel(input_file1)
        df2 = pd.read_excel(input_file2)

        # Identify common columns by taking the intersection of column names
        common_columns = list(set(df1.columns) & set(df2.columns))

        # Perform an inner join based on common columns
        joined_df = pd.merge(df1, df2, on=common_columns, how='left')

        # Replace NaN values and spaces with empty strings in the joined DataFrame
        joined_df.replace({np.nan: '', ' ': ''}, inplace=True)

        # Convert numeric columns to integers and format as strings
        for column in joined_df.columns:
            if pd.api.types.is_numeric_dtype(joined_df[column]):
                joined_df[column] = joined_df[column].apply(lambda x: str(int(x)) if not np.isnan(x) else '')

        # Filter out rows in df2 where the second column is not empty (including spaces)
        df2 = df2[df2.iloc[:, 1].str.strip() != '']

        # Reset the index of the filtered df2
        df2.reset_index(drop=True, inplace=True)

        return joined_df, df2
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None, None


# Example usage:
input_file1 = r"[*MY_DOCUMENTS_DIRECTORY]itemstoadd.xlsx"
input_file2 = r"[*MY_DOCUMENTS_DIRECTORY]supplimentaryitems.xlsx"
joined_df, filtered_df2 = dynamic_inner_join_excel(input_file1, input_file2)


# Now, you have the joined DataFrame in memory with empty strings instead of NaN values
doc_no = get_first_value(joined_df)

def generate_html_from_dataframe(df, html_content2=None):
    header_row = """
    <tr style="height:38.25pt">
        <td nowrap="" valign="top" style="border:solid windowtext 1.0pt;background:silver;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
<p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Sales Doc.No</span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
</td>
<td valign="top" style="border:solid windowtext 1.0pt;border-left:none;background:silver;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
<p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Sales Document Item</span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
</td>
<td nowrap="" valign="top" style="border:solid windowtext 1.0pt;border-left:none;background:silver;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
<p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Material</span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
</td>
<td nowrap="" valign="top" style="border:solid windowtext 1.0pt;border-left:none;background:silver;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
<p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Item Description</span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
</td>
<td valign="top" style="border:solid windowtext 1.0pt;border-left:none;background:silver;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
<p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Order Quantity</span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
</td>
<td valign="top" style="border:solid windowtext 1.0pt;border-left:none;background:silver;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
<p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Confirmed Quantity</span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
</td>
<td valign="top" style="border:solid windowtext 1.0pt;border-left:none;background:silver;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
<p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Unconfirmed Qty</span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
</td>
<td nowrap="" valign="top" style="border:solid windowtext 1.0pt;border-left:none;background:silver;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
<p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Sales unit</span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
</td>
<td nowrap="" valign="top" style="border:solid windowtext 1.0pt;border-left:none;background:silver;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
<p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Usage Indicator</span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
</td>
<td nowrap="" valign="top" style="border:solid windowtext 1.0pt;border-left:none;background:#ffc000;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
<p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Remark
</span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
</td>
<td valign="top" style="border:solid windowtext 1.0pt;border-left:none;background:#ffc000;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
<p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Customer SKU
</span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
</td>
    </tr>
    """

    # Initialize the HTML output with the header row
    html_output = f"""<!DOCTYPE html>
<html>
<head>
    <title>Embedded HTML</title>
</head>
<body>
<p><b>Dear User,</b></p>
<p>Attached PO was processed successfully <u><b>[%msg_to_each_case]</b></u> , with Sales Number of {str(doc_no)} (RDD: [%pordd], PO Exp:[%poexpiry]) , kindly find the details below:</p>
    <table border="1" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:none">
        <tbody>
            {header_row}
    """
    # Get the columns to format as integers without ".0"
    columns_to_format = df.columns[:3].tolist() + [df.columns[-1]]

    # Iterate through the DataFrame and generate HTML rows
    for index, row in df.iterrows():
        row_html = f"<tr style=\"height:12.75pt\">"
        for col in df.columns:
            cell_value = row[col]
            # Check if the cell is in the specified columns and is a float with .0
            if col in columns_to_format and isinstance(cell_value, float) and cell_value.is_integer():
                cell_value = int(cell_value)
            row_html += f"""
                <td nowrap="" valign="top" style="border:solid windowtext 1.0pt;border-top:none;padding:0in 5.4pt 0in 5.4pt;height:12.75pt">
                    <p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif">{cell_value}<u></u><u></u></span></p>
                </td>
            """
        row_html += "</tr>"
        html_output += row_html

    if html_content2 and not "NaN" in html_content2:
        # Include the second HTML content inside the first table if it's provided and not empty/NaN
        html_output += f""" {html_content2} """

    # Close the HTML table and body
    html_output += """
        </tbody>
    </table>


<p style="font-size: 11px;">Notes:<br>
For the items not found in master data, contact Customer Service team to update it.<br>
For DUMMY material issue, the quantity shown is in pieces as per customer PO, and BTC master data needs to be updated.<br>
For Different Price issue between customer PO & BTC system, customer price needs to be updated first.<br>
For Duplication Entry, the same item with same PO number was created previously in another sales order<br></p>

<p><b>Regards,</b><br>

If you need further clarification, please contact Customer Service Team throw https://itcare.basamh.com/app/btccustomerserviceportal/.<br>
Please do not reply to this email. This mailbox is not monitored, and you will not receive a response.<br></p>


</body>
</html>
    """
    return html_output


def generate_html_from_filtered_dataframe(df):
    # Check if the DataFrame is empty
    if df.empty:
        return ""  # Return an empty string if the DataFrame is empty

    header_row = """
    <br><br>
        <tr style="height:38.25pt">
            <td nowrap="" valign="top" style="border:solid windowtext 1.0pt;background:silver;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
    <p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Sales Doc.No</span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
    </td>
    <td nowrap="" valign="top" style="border:solid windowtext 1.0pt;border-left:none;background:#ffc000;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
    <p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Remark
    </span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
    </td>
    <td valign="top" style="border:solid windowtext 1.0pt;border-left:none;background:#ffc000;padding:0in 5.4pt 0in 5.4pt;height:38.25pt">
    <p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif;color:black">Customer SKU
    </span><span style="font-family:&quot;Arial&quot;,sans-serif"><u></u><u></u></span></p>
    </td>
        </tr>
        """

    # Iterate through the DataFrame and generate HTML rows
    for index, row in df.iterrows():
        row_html = f"<tr style=\"height:12.75pt\">"
        for col in df.columns:
            cell_value = row[col]
            # Check if the cell is in the first three columns and is a float with .0
            if col in df.columns[:3] and isinstance(cell_value, float) and cell_value.is_integer():
                cell_value = int(cell_value)
            row_html += f"""
                    <td nowrap="" valign="top" style="border:solid windowtext 1.0pt;border-top:none;padding:0in 5.4pt 0in 5.4pt;height:12.75pt">
                        <p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif">{cell_value}<u></u><u></u></span></p>
                    </td>
                """
        row_html += "</tr>"
        header_row += row_html

    # Close the HTML table and body
    header_row += """
            </tbody>
        </table>
    </body>
    </html>
        """

    return header_row


# Example usage:
html_output2 = generate_html_from_filtered_dataframe(filtered_df2)

def send_email(sender_email, sender_password, recipient_email, subject, html_content, cc_recipients=None, attachment_folder=None):
    try:
        # Create a secure connection to the email server
        server = smtplib.SMTP('smtp.office365.com', 587)

        # Start the TLS encryption
        server.starttls()

        # Login to the sender's email account
        server.login(sender_email, sender_password)

        # Create a multipart message object
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = subject

        # Attach the HTML content to the email
        msg.attach(MIMEText(html_content, 'html'))

        if cc_recipients:
            # Add CC recipients to the message
            msg['Cc'] = ', '.join(cc_recipients)

        if attachment_folder is not None:
            # List files in the attachment folder
            files = os.listdir(attachment_folder)

            if files:
                # Get the first file in the folder (assuming it's the PDF)
                pdf_file = files[0]

                # Attach the PDF file
                attachment_path = os.path.join(attachment_folder, pdf_file)
                attachment = open(attachment_path, "rb")
                part = MIMEBase('application', 'octet-stream')
                part.set_payload((attachment).read())
                encoders.encode_base64(part)
                part.add_header('Content-Disposition', f"attachment; filename= {pdf_file}")
                msg.attach(part)

        # Combine the recipient and CC recipients into a single list
        recipients = [recipient_email] + cc_recipients if cc_recipients else [recipient_email]

        # Send the email
        server.sendmail(sender_email, recipients, msg.as_string())

        print("Email sent successfully!")
    except Exception as e:
        print("Error sending email:", str(e))
    finally:
        # Close the connection to the email server
        server.quit()

# Example usage:
sender_email = "[%email_username_credential]"
sender_password = "[%email_password_credential]"
recipient_email = "[%sendtoemailaddress_cleaned]"
#doc_no = get_first_value(joined_df)
subject = "[%POvendorcurrent] [%shipto] - PO# [%ponumber]– {0}".format(str(doc_no))
cc_recipients = ["[%email_group_to_send]"]  # List of CC email addresses
# Path to the folder containing the PDF file
attachment_folder = r"[%tmpattachmentsfolder]"

# Generate the combined HTML content
html_output = generate_html_from_dataframe(joined_df, html_output2)

# Send the email with the combined HTML content and CC recipients
send_email(sender_email, sender_password, recipient_email, subject, html_output, cc_recipients, attachment_folder=attachment_folder)