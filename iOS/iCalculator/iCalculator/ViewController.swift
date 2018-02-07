//
//  ViewController.swift
//  iCalculator
//
//  Created by Peter Nagy on 2018. 01. 09..
//  Copyright © 2018. Peter Nagy. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

  @IBOutlet weak var leftTextField: UITextField!
  @IBOutlet weak var rightTextField: UITextField!
  @IBOutlet weak var resultLabel: UILabel!
  let numberFormatter = NumberFormatter()
  
  override func viewDidLoad() {
    numberFormatter.minimumFractionDigits = 0
    numberFormatter.maximumFractionDigits = 2
  }

  @IBAction func calculateResult(_ sender: Any) {
    let left = Double(leftTextField.text!)
    let right = Double(rightTextField.text!)
    let result = left! + right!
    resultLabel.text = numberFormatter.string(from: NSNumber(value: result))!
  }

}
