package nagy.szabolcs.peter.calculator;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    private static String fmt(double d)
    {
        if(d == (long) d)
            return String.format("%d",(long)d);
        else
            return String.format("%s",d);
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button b = findViewById(R.id.addButton);
        final TextView result = findViewById(R.id.resultLabel);
        final EditText leftEditText = findViewById(R.id.leftEditText);
        final EditText rightEditText = findViewById(R.id.rightEditText);
        b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(leftEditText.getText().length() == 0 || rightEditText.getText().length() == 0){
                    result.setText(fmt(0));
                    return;
                };

                double i = Double.parseDouble(String.valueOf(leftEditText.getText()));
                double j = Double.parseDouble(String.valueOf(rightEditText.getText()));
                result.setText(fmt(i + j));
            }
        });
    }
}
